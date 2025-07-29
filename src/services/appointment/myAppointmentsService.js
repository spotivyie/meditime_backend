import Appointment from '../../models/Appointment.js';

export const getMyAppointmentsService = async (user, query) => {
  let filter = {};
  if (user.role === 'patient') filter.patient = user.id;
  if (user.role === 'doctor') filter.doctor = user.id;
  if (query.status) filter.status = query.status;

  return Appointment.find(filter)
    .populate('patient', 'name email phone')
    .populate('doctor', 'name email specialty')
    .sort('date');
};