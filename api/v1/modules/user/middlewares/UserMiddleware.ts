import { Jwt, JwtPayload } from 'jsonwebtoken';
import { encrypt, compare } from '../helpers/handleBcrypt';
import { generateJWT, verifyJWT } from '../helpers/handleJWT';
import { Candidate, Representative, User } from '../models/user';

export const checkGetUserById = async (id: string, token: string) => {
  const user = await User.findById(id);
  if (!user) {
    return 'User not found';
  }
  try {
    if (token.length === 0) {
      return 'No token provided';
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      return 'Unauthorized';
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// Comprobar si faltan campos requeridos en el candidato
// Comprobar si el candidato ya existe
// Encriptar la contraseña
export const checkCreateCandidate = async (data: any) => {
  try {
    // Comprobar si faltan campos requeridos en el candidato
    if (!data.username || !data.email || !data.fullName || !data.password || !data.githubUser || !data.candidateSubscription) {
      return'Missing required fields';
    }

    // Comprobar si el candidato ya existe
    const existingUsername = await Candidate.findOne({ username: data.username });
    const existingEmail = await Candidate.findOne({ email: data.email });
    const existingGithubUser = await Candidate.findOne({ githubUser: data.githubUser });
    if (existingUsername) {
      return 'Username already exists';
    }
    if (existingEmail) {
      return 'User with that email already exists';
    }
    if (existingGithubUser) {
      return 'User with that GitHub username already exists';
    }

    // Encriptar la contraseña
    data.password = await encrypt(data.password);
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

// Comprobar si faltan campos requeridos en el representante
// Comprobar si el representante ya existe
// Encriptar la contraseña
export const checkCreateRepresentative = async (data: any) => {
  try {
    // Comprobar si faltan campos requeridos en el representante
    if (!data.username || !data.password || !data.email || !data.companyName ) {
      return 'Missing required fields';
    }

    // Comprobar si el representante ya existe
    const existingUsername = await Representative.findOne({ username: data.username });
    const existingEmail = await Representative.findOne({ email: data.email });
    if (existingUsername) {
      return 'Username already exists';
    }
    if (existingEmail) {
      return 'User with that email already exists';
    }

    // Encriptar la contraseña
    data.password = await encrypt(data.password);
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

// Comprobar si el usuario existe
// Comprobar si la contraseña es correcta
export const checkLoginUser = async (token: string, data: any) => {
  try {
    // Comprobar si el usuario existe
    const user = await User.findOne({ username: data.username });
    if (!user) {
      return 'User not found';
    }
    // Comprobar si la contraseña es correcta
    const checkPassword = await compare(data.password, user.password);
    if (!checkPassword) {
      return 'Invalid password';
    }
    if (token.length > 0) {
      return 'User already logged in';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// TODO: Check user's session token
export const checkUpdateCandidate = async (id: string, token: string, data: any) => {
  try {
    const user = await Candidate.findById(id);
    if (!user) {
      return 'User not found';
    }
    if (!data) {
      return 'No data to update';
    }
    if (token.length === 0) {
      return 'No token provided';
    }
    const decodedToken = verifyJWT(token);
    console.log(decodedToken);
    if (decodedToken.sub !== id) {
      return 'Unauthorized';
    }
    // Encriptar la contraseña
    if (data.password) {
      data.password = await encrypt(data.password);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Comprobar si el usuario existe
// Comprobar si hay datos para actualizar
// Comprobar si el token es correcto
// Encriptar la contraseña si se ha actualizado
export const checkUpdateRepresentative = async (id: string, token: string, data: any) => {
  try {
    const user = await Representative.findById(id);
    if (!user) {
      return 'User not found';
    }
    if (!data) {
      return 'No data to update';
    }
    if (token.length === 0) {
      return 'No token provided';
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      return 'Unauthorized';
    }
    // Encriptar la contraseña si se ha actualizado
    if (data.password) {
      data.password = await encrypt(data.password);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Comprobar si el usuario existe
// Comprobar si el token es correcto
export const checkDeleteUser = async (id: string, token: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return 'User not found';
    }
    if (token.length === 0) {
      return 'No token provided';
    }
    const decodedToken = verifyJWT(token); 
    if (decodedToken.sub !== id) {
      return 'Unauthorized';
    }
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }
}

export default {
  checkGetUserById,
  checkCreateCandidate,
  checkCreateRepresentative,
  checkLoginUser,
  checkUpdateCandidate,
  checkUpdateRepresentative,
  checkDeleteUser
};
