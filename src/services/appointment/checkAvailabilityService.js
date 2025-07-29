import Appointment from '../../models/Appointment.js';

export const checkAvailabilityService = async (doctorId, date) => {
  if (!doctorId || !date) throw { status: 400, message: 'doctorId e date são obrigatórios' };

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    doctor: doctorId,
    date: { $gte: startDate, $lte: endDate },
    status: { $ne: 'canceled' },
  }).select('date');

  const workingHours = Array.from({ length: 10 }, (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`);
  const occupied = appointments.map(app => new Date(app.date).getHours()).map(h => `${h.toString().padStart(2, '0')}:00`);

  return workingHours.filter(h => !occupied.includes(h));
};