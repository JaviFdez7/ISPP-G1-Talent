import { verifyJWT } from '../../user/helpers/handleJWT'
import { History} from '../models/history'
import { type Request, type Response, type NextFunction } from 'express'
import { ApiResponse } from '../../../utils/ApiResponse'

//ORDEN DE USO:
//1º checkAuthorization para verificar tokens
//2º checkCorrectHistory para verificar historial y permisos
//3º checkDeleteHistorial para verificar que se puede borrar

export const checkCorrectHistory: any = async (req: Request, res: Response, next: NextFunction)=>{
	try {
		const userId = req.params.userId.toString()
		const id = req.params.id.toString()
		const history = await History.findById(id)
		if (!history) {
			const message = 'History not found'
			ApiResponse.sendError(res, [{ title: 'Not Found', detail: message }], 404)
			return
		}else if(history.userId && history.userId.toString()!==userId){
			const message = 'Permission denied'
			ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401)
			return
		}else{
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Error deleting history',
				detail: error.message,
			},
		])
	}
}

export const checkAuthorization: any = async (req: Request, res: Response, next: NextFunction)=>{
	try{
		const userId = req.params.userId.toString()
		const token = req.headers.authorization ?? ''
		if (token.length === 0) {
			const message = 'No token provided'
			ApiResponse.sendError(res, [{ title: 'Unauthorized', detail: message }], 401)
			return
		}
		const decodedToken = verifyJWT(token)
		if (decodedToken.sub !== userId) {
			const message = 'Permission denied'
			ApiResponse.sendError(res, [{ title: 'Forbidden', detail: message }], 401)
			return
		} else{
			next()
		}

	}catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Error deleting history',
				detail: error.message,
			},
		])
	}
}
export const checkDeleteHistory: any = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id.toString()
		const history = await History.findById(id)
		if ((history as any).favorite) {
			const message = 'Cannot delete favorite history'
			ApiResponse.sendError(res, [{ title: 'Bad Request', detail: message }], 400)
			return
		} else{
			next()
		}
	} catch (error: any) {
		ApiResponse.sendError(res, [
			{
				title: 'Error deleting history',
				detail: error.message,
			},
		])
	}
}