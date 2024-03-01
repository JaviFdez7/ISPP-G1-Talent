import bcrypt from 'bcryptjs';

const encrypt = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

const compare = async (password: string, hash: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

export { encrypt, compare };
