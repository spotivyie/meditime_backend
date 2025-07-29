import * as appointmentService from '../services/appointment/index.js'

// Histórico de atendimentos de um paciente
export const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const user = req.user;

    // Usar serviço
    const history = await appointmentService.getPatientHistoryService(patientId, user);

    res.json(history);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar histórico', error });
  }
};

// Relatórios de consultas por dia/mês e médicos mais requisitados
export const getReports = async (req, res) => {
  try {
    // Usar serviço
    const reports = await appointmentService.getReportsService();

    res.json(reports);
  } catch (error) {
    console.error("Erro ao gerar relatório", error);
    res.status(error.status || 500).json({ message: error.message || "Erro ao gerar relatório", error });
  }
};
