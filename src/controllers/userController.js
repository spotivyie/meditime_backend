import * as appointmentService from '../services/appointment/index.js'

// Listar todos os médicos (para pacientes escolherem)
export const getDoctors = async (req, res) => {
  try {
    const { specialty } = req.query;

    const doctors = await appointmentService.getDoctorsService({ specialty });

    res.json(doctors);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar médicos', error });
  }
};

// Listar todos os pacientes (para médicos escolherem)
export const getPatients = async (req, res) => {
  try {
    const user = req.user;

    const patients = await appointmentService.getPatientsService(user);

    res.json(patients);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar pacientes', error });
  }
};
