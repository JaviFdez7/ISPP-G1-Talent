import mongoose from 'mongoose';
import User from '../models/user';

// Default service functions
export const getAllUser: any = async () => {
  return await User.find({});
};

export const getUserById: any = async (id: any) => {
  return await User.findById(id);
};

export const createUser: any = async (username: string) => {
  try {
    const user = new User({ username });

    await user.save();

    console.log('Usuario insertado correctamente en la base de datos');
  } catch (error) {
      console.error('Error al insertar usuario:', error);
  }
};

export const updateUser: any = async (id: any, data: any) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
};

export const deleteUser: any = async (id: any) => {
  await User.findByIdAndDelete(id);
  return { message: 'User deleted successfully' };
};
export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
