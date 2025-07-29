import User from '../../models/User.js';

export const deleteUserService = async (id) => {
  await User.findByIdAndDelete(id);
  return { message: 'Usuário deletado com sucesso.' };
};
