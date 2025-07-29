import { registerUser } from '../services/auth/registerUser.js';
import { loginUser } from '../services/auth/loginUser.js';
import { updateProfileService } from '../services/auth/updateProfile.js';

// Registrar
export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body, req.file);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Entrar
export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Sair
export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logout realizado com sucesso' });
};

// Atualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const result = await updateProfileService(req.user.id, req.body, req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
