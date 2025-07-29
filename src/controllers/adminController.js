import { listUsersService } from '../services/admin/listUsers.js';
import { createUserService } from '../services/admin/createUser.js';
import { updateUserService } from '../services/admin/updateUser.js';
import { deleteUserService } from '../services/admin/deleteUser.js';

// Listar usuários
export const listUsers = async (req, res) => {
  try {
    const users = await listUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

// Criar usuário
export const createUser = async (req, res) => {
  try {
    const result = await createUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao criar usuário.' });
  }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const result = await updateUserService(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Erro ao atualizar usuário.' });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};
