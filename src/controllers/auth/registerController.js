import HttpStatus from 'http-status-codes';

import client from '@/config/database';

export const create = (req, res) => {
  const date = new Date().toISOString();
  console.log(
    client.query('Select * from users', (value, error) => {
      console.log(value, error);
    })
  );
  const { name, email, password } = req.body;

  client.query(
    'INSERT INTO users (id, user_id, name, email, password, created_on) VALUES ($1, $2, $3, $4, $5, $6)',
    [12, '1a8bc', name, email, password, date],
    (error, results) => {
      if (error) console.log(error);

      res.status(HttpStatus.CREATED).json({
        message: 'User Created'
      });
    }
  );
};
