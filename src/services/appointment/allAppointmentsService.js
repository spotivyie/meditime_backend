import Appointment from '../../models/Appointment.js';

export const getAllAppointmentsService = async () => {
  return Appointment.find()
    .populate('patient', 'name email')
    .populate('doctor', 'name email')
    .sort('date');
};
