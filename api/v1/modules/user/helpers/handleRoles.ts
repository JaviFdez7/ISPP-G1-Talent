import { User, Candidate, Representative } from '../models/user';

export const getModelForRole = (role: string) => {
  switch (role) {
    case 'Representative':
      return Representative;
    case 'Candidate':
      return Candidate;
    default:
      return User;
  }
};
