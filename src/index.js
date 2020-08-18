import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './router';

const app = express();

const APP_PORT = process.env.SERVER_PORT || 8000;

// Initialize morgan
app.use(morgan('tiny'));
app.use(json());
//API Routes

app.use('/api', routes);

app.set('port', APP_PORT);

app.listen(app.get('port'), () => {
  console.log(`Server Started on ${app.get('port')}`);
});

// Catch uncaught exceptions
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');

    process.exit(1);
  });

export default app;
