import { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import { ApiResponse } from '../../../utils/ApiResponse'
import { verifyJWT } from '../../user/helpers/handleJWT'
import { Candidate, Representative, User } from '../../user/models/user'
import { CompanySubscription } from '../../subscriptions/models/subscription';
import { History } from '../../history/models/history'
import { getAnalysisByGitHubUsername } from '../services/AnalysisService'

export const validateUsername = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const username: string | undefined = req.params.username

		if (!username) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'Username is required.',
				},
			])

			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: 'Username is required.',
			},
		])
	}
}
export const checkValidTokenAndValidAnalysis: any = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization ?? ''
		const analysisId = req.params.id
		if (token.length === 0) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'No token provided.',
				},
			])
			return
		}
		const decodedToken = verifyJWT(token).sub
		const user = await User.findById(decodedToken)
		if (!user) {
			const message = 'Permission denied'
			ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401)
			return
		} else if (!analysisId) {
			const message = 'Not Found'
			ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404)
			return
		} else if (
			user instanceof Candidate &&
			(user as any).analysisId == !analysisId &&
			user instanceof Representative &&
			!(await History.findOne({ analysisId: analysisId, userId: user._id }))
		) {
			const message = 'Not Found'
			ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const checkValidToken: any = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization ?? ''

		if (token.length === 0) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'No token provided.',
				},
			])
			return
		}
		const decodedToken = verifyJWT(token).sub
		const representative = await Representative.findById(decodedToken)
		if (!representative) {
			const message = 'Permission denied'
			ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const checkValidTokenAndValidGithubUser: any = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization ?? ''
		const githubUsername = req.params.username

		if (token.length === 0) {
			ApiResponse.sendError(res, [
				{
					title: 'Internal Server Error',
					detail: 'No token provided.',
				},
			])
			return
		}
		const decodedToken = verifyJWT(token).sub
		const representative = await Representative.findById(decodedToken)
		if (!representative) {
			const message = 'Permission denied'
			ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401)
			return
		}
		const analysis = await getAnalysisByGitHubUsername(githubUsername)
		if (!analysis) {
			const message = 'Not Found'
			ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404)
			return
		}
		const history = await History.findOne({
			userId: verifyJWT(token).sub,
			analysisId: analysis._id,
		})
		console.log(analysis._id)
		console.log(verifyJWT(token).sub)
		if (!history) {
			const message = 'Not Found'
			ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 404)
			return
		} else {
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
		return
	}
}

export const validateGitHubUserAndApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const githubUsername: string = req.body.username;
	let user_apikey: string | undefined = req.body.apikey;
	user_apikey = user_apikey || process.env.GH_TOKEN;
	const token = req.headers.authorization ?? '';
	if (token.length === 0) {
		const message = 'No token provided';
		ApiResponse.sendError(res, [{
		title: 'Unauthorized', detail: message}], 401);
		return;
	}
	const decodedToken = verifyJWT(token);
	const representative=await Representative.findById(decodedToken);
	if(!representative){
	  const message = 'Incorrect token,no user found';
		ApiResponse.sendError(res, [{
		title: 'Not Found', detail: message}], 404);
		return;
	}
	const subscription=await CompanySubscription.findById((representative as any).subscriptionId);
	if(!subscription || (subscription as any).remainingSearches<=0){
	  const message = 'You cannot search until next month';
		ApiResponse.sendError(res, [{
		title: 'Bad Request', detail: message}], 400);
		return;
	}
	
	
	if (!githubUsername) {
	
	  ApiResponse.sendError(res,[{
		title: 'Internal Server Error',
		detail:'Username is required.'
	  }])
	  return;
	}
	
	try {
	  const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
		headers: {
		  Authorization: `token ${user_apikey}`,
		},
	  });
	
	  if (response.status === 404) {
		ApiResponse.sendError(res,[{
		  title: 'Internal Server Error',
		  detail:'GitHub username does not exist.'
		}])
		return;
		} else if (response.status === 401 || response.status === 403) {
		  res.status(401).send('Invalid API key.');
		  ApiResponse.sendError(res,[{
			title: 'Internal Server Error',
			detail:'Invalid API key'
		  }])
		  return;
		} else if (!response.ok) {
		  ApiResponse.sendError(res,[{
			title: 'Internal Server Error',
			detail:'An error occurred while fetching the GitHub user data.'
		  }])
		}
		return next();
	} catch (error: any) {
	  console.error("Error:", error.message);
	  ApiResponse.sendError(res,[{
		title: 'Internal Server Error',
		detail: error.message
	  }])
	  
	}
	};