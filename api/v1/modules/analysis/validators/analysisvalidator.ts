import { type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from '../../../utils/ApiResponse';
import { verifyJWT } from '../../user/helpers/handleJWT';
export const validateUsername = (req: Request, res: Response, next: NextFunction): void => {
  const username: string | undefined = req.params.username;

  if (!username) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: 'Username is required.'
    }])

    return;
  }

  next();
};
export const checkValidToken: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const token = req.headers.authorization ?? '';
  
      if (token.length === 0) {
          ApiResponse.sendError(res,[{
              title: 'Internal Server Error',
              detail:'No token provided.'
            }])
            return;
       
        }
        const decodedToken = verifyJWT(token);
      
    next();
  } catch (error: any) {
  
    ApiResponse.sendError(res,[{
      title: 'Internal Server Error',
      detail:error.message
    }])
    return;
  }
}

export const validateGitHubUserAndApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const githubUsername: string = req.body.username;
  let user_apikey: string | undefined = req.body.apikey;
  user_apikey = user_apikey || process.env.GH_TOKEN;

  if (!githubUsername) {
    ApiResponse.sendError(res, [{
      title: 'Internal Server Error',
      detail: 'Username is required.'
    }])
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
      headers: {
        Authorization: `token ${user_apikey}`
      }
    });

    if (response.status === 404) {
      ApiResponse.sendError(res, [{
        title: 'Internal Server Error',
        detail: 'GitHub username does not exist.'
      }])
      return;
    } else if (response.status === 401 || response.status === 403) {
      res.status(401).send('Invalid API key.');
      ApiResponse.sendError(res, [{
        title: 'Internal Server Error',
        detail: 'Invalid API key'
      }])
      return;
    } else if (!response.ok) {
      ApiResponse.sendError(res, [{
        title: 'Internal Server Error',
        detail: 'An error occurred while fetching the GitHub user data.'
      }])
    }

    return next();
} catch (error: any) {
  console.error("Error:", error.message);
  ApiResponse.sendError(res,[{
    title: 'Internal Server Error',
    detail: error.message
  }])
  return;
  
}

};
