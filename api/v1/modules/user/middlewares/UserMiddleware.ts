import { encrypt, compare } from '../helpers/handleBcrypt';
import { verifyJWT } from '../helpers/handleJWT';
import { Candidate, Representative, User } from '../models/user';
import { ProfessionalExperience } from '../../professional-experience/models/professional-experience';
import { type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from '../../../utils/ApiResponse';

export const checkGetUserById: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const user = await User.findById(id);
    if (!user || user === null) {
      const message = 'User not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
    } else if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Permission denied';
      ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401);
    } else
      next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error getting user by id',
      detail: error.message
    }]);
  }
}

export const checkGetProfessionalExperienceByUserId: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const experience = await ProfessionalExperience.findOne({ userId: id });
    const token = req.headers.authorization ?? '';
    const user = await User.findById(id);
    if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id.toString()) {
      const message = 'Permission denied';
      ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 403);
    } else if (!user) {
      const message = 'User not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
    } else if (!experience) {
      const message = 'Professional Experience not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
    } else
      next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error getting professional experience by user id',
      detail: error.message
    }]);
  }
}

export const checkCreateCandidate: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const isMissingFields: boolean = !data.username || !data.email || !data.fullName || !data.password || !data.githubUser || !data.candidateSubscription
    // Comprobar si faltan campos requeridos en el candidato
    if (isMissingFields) {
      const message = 'Missing required fields';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    }

    // Comprobar si el candidato ya existe
    const existingUsername = await User.findOne({ username: data.username });
    const existingEmail = await User.findOne({ email: data.email });
    const existingGithubUser = await Candidate.findOne({ githubUser: data.githubUser });
    if (existingUsername) {
      const message = 'Username already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    }
    else if (existingEmail) {
      const message = 'User with that email already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    }
    else if (existingGithubUser) {
      const message = 'User with that GitHub username already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    } else {
      // Encriptar la contraseña
      const inputPassword:string =data.password;
      data.password = await encrypt(inputPassword);
      next();
    }
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error creating candidate',
      detail: error.message
    }]);
  }
}

/*
 * Comprobar si faltan campos requeridos en el representante
 * Comprobar si el representante ya existe
 * Encriptar la contraseña
 */
export const checkCreateRepresentative: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const isMissingFields: boolean = !data.username || !data.password || !data.email || !data.companyName
    // Comprobar si faltan campos requeridos en el representante
    if (isMissingFields) {
      const message = 'Missing required fields';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    }

    // Comprobar si el representante ya existe
    const existingUsername = await User.findOne({ username: data.username });
    const existingEmail = await User.findOne({ email: data.email });
    if (existingUsername) {
      const message = 'Username already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    }
    else if (existingEmail) {
      const message = 'User with that email already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
    } else {
      // Encriptar la contraseña
      data.password = await encrypt(data.password);
      next();
    }
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error creating representative',
      detail: error.message
    }]);
  };
}

/*
 * Comprobar si el usuario existe
 * Comprobar si la contraseña es correcta
 */
export const checkLoginUser: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = req.headers.authorization ?? '';
    if (token.length > 0) {
      const message = 'User already logged in';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    }
    // Comprobar si el usuario existe
    const user = await User.findOne({ username: data.username });
    if (!user) {
      const message = 'User not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
     else if (!await compare(data.password, user.password)) {
      const message = 'Invalid password';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }else{
      next();
    }
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error logging in',
      detail: error.message
    }]);
  }
};

export const checkUpdateCandidate: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = req.headers.authorization ?? '';
    const id = req.params.id.toString();
    const user = await Candidate.findById(id);
    if (!user) {
      const message = 'User not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
    else if (!data) {
      const message = 'No data to update';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    }
    else if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }
    const existingUsername = await User.findOne({ username: data.username ?? '' });
    const existingEmail = await User.findOne({ email: data.email ?? ''});
    if (data.username && existingUsername) {
      const message = 'Username already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    }
    else if (data.email && existingEmail) {
      const message = 'User with that email already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    } 
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      ApiResponse.sendError(res, [{
        title: 'Unauthorized', detail: message}], 401);
      return;
    }
    next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error updating user',
      detail: error.message
    }]);
  }
};

// Comprobar si el usuario existe
// Comprobar si hay datos para actualizar
// Comprobar si el token es correcto
export const checkUpdateRepresentative: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    const data = req.body;
    const user = await Representative.findById(id);
    if (!user) {
      const message = 'User not found';
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
    else if (!data) {
      const message = 'No data to update';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    }
    else if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }
    const existingUsername = await User.findOne({ username: data.username ?? '' });
    const existingEmail = await User.findOne({ email: data.email ?? ''});
    if (data.username && existingUsername) {
      const message = 'Username already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    }
    else if (data.email && existingEmail) {
      const message = 'User with that email already exists';
      ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400);
      return;
    } 
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      ApiResponse.sendError(res, [{
        title: 'Unauthorized', detail: message}], 401);
      return;
    }
    next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error updating user',
      detail: error.message
    }]);
  }
};

export const checkUpdateUserProfilePicture: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const token = req.headers.authorization ?? '';
    if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{
        title: 'Unauthorized', detail: message}], 401);
      return;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      ApiResponse.sendError(res, [{
        title: 'Unauthorized', detail: message}], 401);
      return;
    }
    next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error updating profile picture',
      detail: error.message
    }]);
  }
};

export const checkUpdatePassword: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const data = req.body;
    const token = req.headers.authorization ?? '';
    if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{
        title: 'Unauthorized', detail: message}], 401);
      return;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      ApiResponse.sendError(res, [{
        title: 'Unauthorized', detail: message}], 401);
      return;
    }
    if (data.password) {
      data.password = await encrypt(data.password);
    }
    next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error updating password',
      detail: error.message
    }]);
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
      ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404);
      return;
    }
    if (token.length === 0) {
      const message = 'No token provided';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
      return;
    }
    const decodedToken = verifyJWT(token);
    if (decodedToken.sub !== id) {
      const message = 'Unauthorized';
      ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401);
    } else
      next();
  } catch (error: any) {
    ApiResponse.sendError(res, [{
      title: 'Error deleting user',
      detail: error.message
    }]);
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
  checkUpdateUserProfilePicture,
  checkUpdatePassword,
  checkDeleteUser
};
