import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default (password) => {
  const hash = bcrypt.hashSync(password, SALT_ROUNDS);
  return hash;
};
