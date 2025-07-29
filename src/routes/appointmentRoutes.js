import express from 'express';
import {
    getDoctorAgenda,
    checkAvailability,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    getMyAppointments,
    getAppointmentById,
    getAllAppointments,
} from '../controllers/appointmentController.js';

import {
    getPatientHistory,
    getReports,
} from '../controllers/historyController.js';

import {
    getDoctors,
    getPatients,
} from '../controllers/userController.js';

import { authenticate } from '../middlewares/authMiddleware.js';
import {
    isAdmin,
    isDoctor,
    isPatient,
    isAdminOrDoctor
} from '../utils/roles.js';

const router = express.Router();

// Listar médicos e pacientes
router.get('/doctors', authenticate, getDoctors);
router.get('/patients', authenticate, isAdminOrDoctor, getPatients);

// Agenda e disponibilidade
router.get('/availability', authenticate, checkAvailability);
router.get('/doctor-agenda', authenticate, getDoctorAgenda);
router.get('/doctor-agenda/:id', authenticate, getAppointmentById);

// Consultas
router.get('/my-appointments', authenticate, getMyAppointments);
router.post('/appointments', authenticate, createAppointment);
router.put('/appointments/:id', authenticate, updateAppointment);
router.delete('/appointments/:id', authenticate, cancelAppointment);

// Histórico e relatórios
router.get('/patient-history/:patientId', authenticate, getPatientHistory);
router.get('/reports', authenticate, isAdmin, getReports);

// Todas as consultas - admin
router.get('/all-appointments', authenticate, isAdmin, getAllAppointments);

export default router;
