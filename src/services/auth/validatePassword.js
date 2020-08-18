import { compareSync } from 'bcrypt';

export default (password, hashPassword) => {
  return compareSync(password, hashPassword);
};
