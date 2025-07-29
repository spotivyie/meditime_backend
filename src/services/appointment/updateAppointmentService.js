import Appointment from '../../models/Appointment.js';

export const updateAppointmentService = async (id, updates, user) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw { status: 404, message: 'Consulta não encontrada' };

  if (user.role === 'patient' && appointment.patient.toString() !== user.id) {
    throw { status: 403, message: 'Você só pode atualizar suas próprias consultas' };
  }

  if (user.role === 'doctor' && appointment.doctor.toString() !== user.id) {
    throw { status: 403, message: 'Você só pode atualizar consultas onde é o médico' };
  }

  if (updates.date) {
    const newDate = new Date(updates.date);
    const conflict = await Appointment.findOne({
      _id: { $ne: id },
      doctor: appointment.doctor,
      date: newDate,
      status: { $ne: 'canceled' }
    });
    if (conflict) throw { status: 400, message: 'Novo horário já ocupado' };
  }

  return Appointment.findByIdAndUpdate(id, updates, { new: true })
    .populate('patient', 'name email phone')
    .populate('doctor', 'name email specialty');
};