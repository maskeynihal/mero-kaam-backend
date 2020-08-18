import client from '@/config/database';

const getUserByEmail = async (email) => {
  try {
    const queryUser = await client.query('SELECT * FROM users WHERE email = ($1)', [email]);
    return queryUser.rows;
  } catch (error) {
    throw error;
  }
};

const createUser = async (request) => {
  const { userId, name, email, password, date } = request;
  try {
    const createdUser = await client.query(
      'INSERT INTO users(user_id, name, email, password, created_on) VALUES ($1,$2,$3,$4,$5)',
      [userId, name, email, password, date]
    );

    return request;
  } catch (error) {
    throw error;
  }
};

export { getUserByEmail, createUser };
