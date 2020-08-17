import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from

const app = express();

const APP_PORT = process.env.SERVER_PORT || 8000;

app.set('port', APP_PORT);

// Initialize morgan
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('heelog');
});

app.listen(app.get('port'), () => {
  console.log(`Server Started on ${app.get('port')}`);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  process.exit(1);
});

export default app;
