import { sign, verify } from 'jsonwebtoken';
import { User } from '../models/user';

const JWT_TOKEN: string = process.env.JWT_SECRET ?? 'jwt_secret';

const generateJWT = (id: string | undefined) => {
  const jwt = sign({ sub: id }, JWT_TOKEN, { expiresIn: '1h' })
  return jwt;
}

const verifyJWT = (token: string) => {
  return verify(token, JWT_TOKEN);
}
console.log(generateJWT('65f22491a59fa69005bb18f1'))
export { generateJWT, verifyJWT };
