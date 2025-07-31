import * as appointmentService from '../services/appointment/index.js'

// Listar agenda de um médico
export const getDoctorAgenda = async (req, res) => {
  try {
    const agenda = await appointmentService.getDoctorAgendaService(req.user, req.query);
    res.json(agenda);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar agenda' });
  }
};

// Verificar disponibilidade de horário
export const checkAvailability = async (req, res) => {
  try {
    console.log('query recebida:', req.query);
    const timezone = req.query.timezone || 'UTC';
    const available = await appointmentService.checkAvailabilityService(req.query.doctorId, req.query.date, timezone);
    res.json(available);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao verificar disponibilidade' });
  }
};

// Marcar nova consulta
export const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointmentService(req.body, req.user);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao criar consulta' });
  }
};

// Atualizar consulta (remarcar, alterar status, notas)
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointmentService(req.params.id, req.body, req.user);
    res.json(appointment);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar consulta' });
  }
};

// Cancelar consulta
export const cancelAppointment = async (req, res) => {
  try {
    const canceled = await appointmentService.cancelAppointmentService(req.params.id, req.user);
    res.json(canceled);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao cancelar consulta' });
  }
};

// Minhas consultas (paciente ou médico)
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getMyAppointmentsService(req.user, req.query);
    res.json(appointments);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar consultas' });
  }
};

// Buscar consulta por ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointmentByIdService(req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar agendamento' });
  }
};

// Buscar todas as consultas (admin)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointmentsService();
    res.json(appointments);
  } catch (error) {
    console.error('Erro:', error);
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar todas as consultas' });
  }
};
