import { sign, verify, type JwtPayload } from 'jsonwebtoken';
import { encrypt, compare } from '../helpers/handleBcrypt'
const JWT_TOKEN: string = process.env.JWT_SECRET ?? 'jwt_secret';

const generateJWT = (id: string | undefined): string => {
  const jwt = sign({ sub: id }, JWT_TOKEN, { expiresIn: '1h' })
  return jwt;
}

const verifyJWT = (token: string): string | JwtPayload => verify(token, JWT_TOKEN)
console.log(generateJWT("630f1f8bcf30e2d9c6a7d8b2"))
export { generateJWT, verifyJWT };
