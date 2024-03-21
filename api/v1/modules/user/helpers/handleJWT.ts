import { sign, verify, type JwtPayload } from 'jsonwebtoken';

const JWT_TOKEN: string = process.env.JWT_SECRET ?? 'jwt_secret';

const generateJWT = (id: string | undefined): string => {
  const jwt = sign({ sub: id }, JWT_TOKEN, { expiresIn: '1h' })
  return jwt;
}

const verifyJWT = (token: string): string | JwtPayload => verify(token, JWT_TOKEN)

export { generateJWT, verifyJWT };
