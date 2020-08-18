import { sign } from 'jsonwebtoken';

export default (data) => {
  return sign({ email: data.email, userId: data.user_id }, process.env.TOKEN_SECRET, { expiresIn: '36400s' });
};
