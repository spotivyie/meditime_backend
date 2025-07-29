import User from '../../models/User.js';

export const getDoctorsService = async (query) => {
  let filter = { role: 'doctor' };
  if (query.specialty) filter.specialty = query.specialty;

  return User.find(filter)
    .select('name email specialty phone')
    .sort('name');
};

