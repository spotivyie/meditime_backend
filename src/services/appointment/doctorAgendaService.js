import Appointment from '../../models/Appointment.js';

export const getDoctorAgendaService = async (user, query) => {
  const doctorId = user.id;
  if (!doctorId) throw { status: 400, message: 'doctorId é obrigatório' };

  let filter = { doctor: doctorId, status: { $ne: 'canceled' } };

  if (query.range === 'next') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(end.getDate() + 7);
    filter.date = { $gte: today, $lte: end };
  } else if (query.date) {
    const start = new Date(query.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(query.date);
    end.setHours(23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  return Appointment.find(filter)
    .populate('patient', 'name email phone')
    .populate('doctor', 'name email specialty')
    .sort('date');
};