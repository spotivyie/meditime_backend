import Appointment from '../../models/Appointment.js';
import User from '../../models/User.js';

export const getPatientsService = async (user) => {
  try {
    let patients;

    if (user.role === 'doctor') {
      const appointments = await Appointment.find({ doctor: user.id }).select('patient');
      const patientIds = [...new Set(appointments.map(app => app.patient.toString()))];

      patients = await User.find({ _id: { $in: patientIds } })
        .select('name email phone photo') 
        .sort('name');
    } else {
      patients = await User.find({ role: 'patient' })
        .select('name email phone photo') 
        .sort('name');
    }

    patients = patients.map(patient => ({
  ...patient.toObject(),
  photo: patient.photo ? patient.photo : null, 
}));

    return patients;
  } catch (error) {
    throw new Error('Erro ao buscar pacientes: ' + error.message);
  }
};
