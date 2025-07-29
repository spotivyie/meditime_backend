import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const updateUserService = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw { status: 404, message: 'Usuário não encontrado.' };

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  if (data.role) user.role = data.role;

  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  await user.save();
  return { message: 'Usuário atualizado com sucesso.' };
};
