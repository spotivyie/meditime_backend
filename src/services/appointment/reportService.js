import Appointment from '../../models/Appointment.js';
import User from '../../models/User.js';

export const getReportsService = async () => {
  const consultationsByDay = await Appointment.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const consultationsByMonth = await Appointment.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const doctorCounts = await Appointment.aggregate([
    { $group: { _id: "$doctor", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const doctors = await User.find({ role: "doctor" }).select("_id name");
  const doctorStats = doctorCounts.map(dc => ({
    doctorName: doctors.find(d => d._id.toString() === dc._id.toString())?.name || 'Desconhecido',
    count: dc.count
  }));

  return { consultationsByDay, consultationsByMonth, doctorStats };
};