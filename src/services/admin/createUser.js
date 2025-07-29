import User from '../../models/User.js';

export const createUserService = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: 'Email já cadastrado.' };
  }

  const newUser = new User({ name, email, password, role });
  await newUser.save();

  return { message: 'Usuário criado com sucesso.' };
};
