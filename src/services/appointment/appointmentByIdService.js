import Appointment from '../../models/Appointment.js';

export const getAppointmentByIdService = async (id) => {
  const appointment = await Appointment.findById(id)
    .populate('patient', 'name email phone')
    .populate('doctor', 'name email specialty');
  if (!appointment) throw { status: 404, message: 'Agendamento não encontrado' };
  return appointment;
};