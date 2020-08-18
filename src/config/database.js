import { Client } from 'pg';

const client = new Client({
  user: 'karya',
  host: 'localhost',
  database: 'karya',
  password: 'password',
  port: 5432
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    throw error;
  }
})();

export default client;
