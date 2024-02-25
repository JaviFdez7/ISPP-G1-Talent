import jwt, { sign } from 'jsonwebtoken';

const JWT_TOKEN = process.env.JWT_SECRET || 'secret';

const generateJWT = (id: string) => {
  const jwt = sign({ id }, JWT_TOKEN, { expiresIn: '2h' })
  return jwt;
}

const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_TOKEN);
}

export { generateJWT, verifyJWT };
