import Appointment from '../../models/Appointment.js';

export const cancelAppointmentService = async (id, user) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw { status: 404, message: 'Consulta não encontrada' };

  if (user.role === 'patient' && appointment.patient.toString() !== user.id) {
    throw { status: 403, message: 'Você só pode cancelar suas próprias consultas' };
  }

  if (user.role === 'doctor' && appointment.doctor.toString() !== user.id) {
    throw { status: 403, message: 'Você só pode cancelar consultas onde é o médico' };
  }

  return Appointment.findByIdAndUpdate(id, { status: 'canceled' }, { new: true })
    .populate('patient', 'name email phone')
    .populate('doctor', 'name email specialty');
};

export const getPatientHistoryService = async (patientId, user) => {
  if (user.role === 'patient' && patientId !== user.id) {
    throw { status: 403, message: 'Você só pode ver seu próprio histórico' };
  }

  return Appointment.find({ patient: patientId })
    .populate('doctor', 'name email specialty')
    .sort('-date');
};