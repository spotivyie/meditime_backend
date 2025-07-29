import User from '../../models/User.js';

export const updateProfileService = async (userId, data, file) => {
  const { name, email, password } = data;
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuário não encontrado');

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  if (file) user.photo = `/uploads/${file.filename}`;

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    photo: user.photo,
  };
};
