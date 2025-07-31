import Appointment from '../../models/Appointment.js';
import { toDate } from 'date-fns-tz';

export const updateAppointmentService = async (id, updates, user) => {
  console.log('[updateAppointmentService] Recebendo update:', updates, 'para id:', id);
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) throw { status: 404, message: 'Consulta não encontrada' };

    if (user.role === 'patient' && appointment.patient.toString() !== user.id) {
      throw { status: 403, message: 'Você só pode atualizar suas próprias consultas' };
    }

    if (user.role === 'doctor' && appointment.doctor.toString() !== user.id) {
      throw { status: 403, message: 'Você só pode atualizar consultas onde é o médico' };
    }

    if (updates.date) {
      const localDate = new Date(updates.date);
      console.log('[updateAppointmentService] Data recebida para atualização:', updates.date);
      console.log('[updateAppointmentService] Data local:', localDate);

      updates.date = toDate(localDate);

      const conflict = await Appointment.findOne({
        _id: { $ne: id },
        doctor: appointment.doctor,
        date: updates.date,
        status: { $ne: 'canceled' }
      });

      if (conflict) throw { status: 400, message: 'Novo horário já ocupado' };
    }

    const updated = await Appointment.findByIdAndUpdate(id, updates, { new: true })
      .populate('patient', 'name email phone')
      .populate('doctor', 'name email specialty');

    console.log('[updateAppointmentService] Consulta atualizada com sucesso:', updated);
    return updated;
  } catch (error) {
    console.error('[updateAppointmentService] Erro geral:', error);
    throw error;
  }
};
