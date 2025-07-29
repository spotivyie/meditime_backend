import Appointment from '../../models/Appointment.js';
import User from '../../models/User.js';

export const createAppointmentService = async (data, user) => {
  const { patient, doctor, date, notes } = data;

  if (user.role === 'patient' && patient !== user.id) {
    throw { status: 403, message: 'Você só pode agendar consultas para si mesmo' };
  }

  const doctorExists = await User.findById(doctor);
  if (!doctorExists || doctorExists.role !== 'doctor') throw { status: 404, message: 'Médico não encontrado' };

  const patientExists = await User.findById(patient);
  if (!patientExists || patientExists.role !== 'patient') throw { status: 404, message: 'Paciente não encontrado' };

  const appointmentDate = new Date(date);
  if (appointmentDate < new Date()) throw { status: 400, message: 'Não é possível agendar consultas no passado' };

  const conflict = await Appointment.findOne({ doctor, date: appointmentDate, status: { $ne: 'canceled' } });
  if (conflict) throw { status: 400, message: 'Horário já ocupado' };

  const newAppointment = await Appointment.create({ patient, doctor, date: appointmentDate, notes: notes || '' });

  return Appointment.findById(newAppointment._id)
    .populate('patient', 'name email phone')
    .populate('doctor', 'name email specialty');
};