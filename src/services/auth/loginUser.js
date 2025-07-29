import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const gerarToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const loginUser = async (body) => {
  if (!body || !body.email || !body.password) {
    throw new Error('Email e senha são obrigatórios.');
  }

  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Credenciais inválidas');
  }

  const token = gerarToken(user);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    photo: user.photo,
    token,
  };
};

