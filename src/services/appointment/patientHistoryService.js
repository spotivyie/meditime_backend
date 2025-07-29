import Appointment from '../../models/Appointment.js';

export const getPatientHistoryService = async (patientId, user) => {
  if (user.role === 'patient' && patientId !== user.id) {
    throw { status: 403, message: 'Você só pode ver seu próprio histórico' };
  }

  return Appointment.find({ patient: patientId })
    .populate('doctor', 'name email specialty')
    .sort('-date');
};