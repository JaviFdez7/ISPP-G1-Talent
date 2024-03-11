import { encrypt, compare } from '../helpers/handleBcrypt';
import { verifyJWT } from '../helpers/handleJWT';
import { Candidate, Representative, User } from '../models/user';
import { ProfessionalExperience } from '../../professional-experience/models/professional-experience';
import e, { type Request, type Response, type NextFunction } from 'express';

export const checkGetUserById: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const user = await User.findById(id);
    if (!user) {
      const message = 'User not found';
      res.status(404).send(message);
      return message;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== user._id.toString()) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    } else {
      next();
    }
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }
}

export const checkGetProfessionalExperienceByUserId: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const experience = await ProfessionalExperience.findOne({userId:id});
    const token = req.headers.authorization ?? '';
    const user = await User.findById(id);
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id.toString()) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    } else if (!user) {
      const message = 'User not found';
      res.status(404).send(message);
      return message;
    } else if (!experience) {
      const message = 'Professional Experience not found';
      res.status(404).send(message);
      return message;
    } else {
      next();
    }
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }
}

export const checkCreateCandidate: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    // Comprobar si faltan campos requeridos en el candidato
    if (!data.username || !data.email || !data.fullName || !data.password || !data.githubUser || !data.candidateSubscription) {
      const message = 'Missing required fields';
      res.status(400).send(message);
      return message;
    }

    // Comprobar si el candidato ya existe
    const existingUsername = await User.findOne({ username: data.username });
    const existingEmail = await User.findOne({ email: data.email });
    const existingGithubUser = await Candidate.findOne({ githubUser: data.githubUser });
    if (existingUsername) {
      const message = 'Username already exists';
      res.status(400).send(message);
      return { existingUsername: message}
    }
    if (existingEmail) {
      const message = 'User with that email already exists';
      res.status(400).send(message);
      return { existingEmail: message }
    }
    if (existingGithubUser) {
      const message = 'User with that GitHub username already exists';
      res.status(400).send(message);
      return { existingGithubUser: message }
    } else {
      // Encriptar la contraseña
      data.password = await encrypt(data.password);
      next();
    }
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

// Comprobar si faltan campos requeridos en el representante
// Comprobar si el representante ya existe
// Encriptar la contraseña
export const checkCreateRepresentative: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    // Comprobar si faltan campos requeridos en el representante
    if (!data.username || !data.password || !data.email || !data.companyName ) {
      const message = 'Missing required fields';
      res.status(400).send(message);
      return message;
    }

    // Comprobar si el representante ya existe
    const existingUsername = await User.findOne({ username: data.username });
    const existingEmail = await User.findOne({ email: data.email });
    if (existingUsername) {
      const message = 'Username already exists';
      res.status(400).send(message);
      return { existingUsername: message}
    }
    if (existingEmail) {
      const message = 'User with that email already exists';
      res.status(400).send(message);
      return { existingEmail: message}
    } else {
      // Encriptar la contraseña
      data.password = await encrypt(data.password);
      next();
    }
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

// Comprobar si el usuario existe
// Comprobar si la contraseña es correcta
export const checkLoginUser: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = req.headers.authorization ?? '';
    // Comprobar si el usuario existe
    const user = await User.findOne({ username: data.username });
    if (!user) {
      const message = 'User not found';
      res.status(404).send(message);
      return { user: 'User not found' };
    }
    // Comprobar si la contraseña es correcta
    const checkPassword = await compare(data.password, user.password);
    if (!checkPassword) {
      const message = 'Invalid password';
      res.status(401).send(message);
      return { checkPassword: message };
    }
    if (token.length > 0) {
      const message = 'User already logged in';
      res.status(400).send(message);
      return { userLog: message };
    } else {
      next();
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
// TODO: Check user's session token
export const checkUpdateCandidate: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = req.headers.authorization ?? '';
    const id = req.params.id.toString();
    const user = await Candidate.findById(id);
    if (!user) {
      const message = 'User not found';
      res.status(404).send(message);
      return message;
    }
    if (!data) {
      const message = 'No data to update';
      res.status(400).send(message);
      return message;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    } else {
      // Encriptar la contraseña
      if (data.password) {
        data.password = await encrypt(data.password);
      }
      next();
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
export const checkUpdateRepresentative: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const data = req.body;
    const user = await Representative.findById(id);
    if (!user) {
      const message = 'User not found';
      res.status(404).send(message);
      return message;
    }
    if (!data) {
      const message = 'No data to update';
      res.status(400).send(message);
      return message;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    } else {
      // Encriptar la contraseña si se ha actualizado
      if (data.password) {
        data.password = await encrypt(data.password);
      }
      next();
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Comprobar si el usuario existe
// Comprobar si el token es correcto
export const checkDeleteUser: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const user = await User.findById(id);
    if (!user) {
      const message = 'User not found';
      res.status(404).send(message);
      return message;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      res.status(401).send(message);
      return message;
    }
    const decodedToken = verifyJWT(token); 
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      res.status(401).send(message);
      return message;
    } else {
      next();
    }
  } catch (error) {
    console.error('Error deleting user', error)
    throw error;
  }
}

export default {
  checkGetUserById,
  checkGetProfessionalExperienceByUserId,
  checkCreateCandidate,
  checkCreateRepresentative,
  checkLoginUser,
  checkUpdateCandidate,
  checkUpdateRepresentative,
  checkDeleteUser
};
