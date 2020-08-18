import { sign } from 'jsonwebtoken';

export default (email) => {
  return sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '36400s' });
};
