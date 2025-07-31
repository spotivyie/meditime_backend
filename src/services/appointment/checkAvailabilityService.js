const { utcToZonedTime } = await import('date-fns-tz');
import { startOfDay, endOfDay } from 'date-fns';
import Appointment from '../../models/Appointment.js';

export const checkAvailabilityService = async (doctorId, date, timeZone) => {
  if (!doctorId || !date) throw { status: 400, message: 'doctorId e date são obrigatórios' };

  const zonedDate = utcToZonedTime(date, timeZone);

  const startDate = startOfDay(zonedDate);
  const endDate = endOfDay(zonedDate);

  const appointments = await Appointment.find({
    doctor: doctorId,
    date: { $gte: startDate, $lte: endDate },
    status: { $ne: 'canceled' },
  }).select('date');

  const workingHours = Array.from({ length: 10 }, (_, i) =>
    `${(8 + i).toString().padStart(2, '0')}:00`
  );

  const occupied = appointments.map(app => {
    const zonedAppDate = utcToZonedTime(app.date, timeZone);
    return zonedAppDate.getHours().toString().padStart(2, '0') + ':00';
  });

  return workingHours.filter(h => !occupied.includes(h));
};