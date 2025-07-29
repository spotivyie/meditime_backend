import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const gerarToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const registerUser = async (userData, file) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  const photoUrl = file ? `/uploads/${file.filename}` : null;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
    photo: photoUrl,
  });

  const token = gerarToken(newUser);

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    photo: newUser.photo,
    token,
  };
};
