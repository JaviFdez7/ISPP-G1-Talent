// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import TrendService from '../services/TrendService';
import { ApiResponse } from '../../../utils/ApiResponse';

// Default controller functions
export const getTrend: any = async (req: Request, res: Response) => {
  try {
		const data = await TrendService.getTrend()
		return ApiResponse.sendSuccess(res, data, 200, {
			self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
		})
	} catch (error: any) {
		return ApiResponse.sendError(res, [
			{
				title: 'Internal Server Error',
				detail: error.message,
			},
		])
	}
};

export default {
  getTrend
};
