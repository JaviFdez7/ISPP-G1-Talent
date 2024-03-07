import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'

export const validateGitHubUserAndApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const githubUsername: string = req.body.username;
  let user_apikey: string | undefined = req.body.apikey;
  user_apikey = user_apikey || process.env.GH_TOKEN;


  if (!githubUsername) {
    res.status(400).send('Username is required.');
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
      headers: {
        Authorization: `token ${user_apikey}`,
      },
    });

    if (response.status === 404) {
       res.status(404).send('GitHub username does not exist.');
       return;
      } else if (response.status === 401 || response.status === 403) {
         res.status(401).send('Invalid API key.');
         return;
      } else if (!response.ok) {
        throw new Error('An error occurred while fetching the GitHub user data.');
      }
      return next();
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).send('Internal Server Error');
    
  }
};
