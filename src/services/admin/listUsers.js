import User from '../../models/User.js';

export const listUsersService = async () => {
  const users = await User.find().select('-password');
  return users;
};
