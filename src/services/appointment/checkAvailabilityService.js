import * as dateFnsTz from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';
import Appointment from '../../models/Appointment.js';

export const checkAvailabilityService = async (doctorId, date, timeZone = 'UTC') => {
  if (!doctorId || !date) throw { status: 400, message: 'doctorId e date são obrigatórios' };

  const dateWithTime = `${date}T00:00:00`;

  const zonedDate = dateFnsTz.toZonedTime(dateWithTime, timeZone);

  const startDateZoned = startOfDay(zonedDate);
  const endDateZoned = endOfDay(zonedDate);

  const startDateUtc = new Date(startDateZoned.toISOString());
  const endDateUtc = new Date(endDateZoned.toISOString());

  const appointments = await Appointment.find({
    doctor: doctorId,
    date: { $gte: startDateUtc, $lte: endDateUtc },
    status: { $ne: 'canceled' },
  }).select('date');

  const workingHours = Array.from({ length: 10 }, (_, i) =>
    `${(8 + i).toString().padStart(2, '0')}:00`
  );

  const occupied = appointments.map(app => {
    const zonedAppDate = dateFnsTz.toZonedTime(app.date, timeZone);
    return zonedAppDate.getHours().toString().padStart(2, '0') + ':00';
  });

  return workingHours.filter(h => !occupied.includes(h));
};
