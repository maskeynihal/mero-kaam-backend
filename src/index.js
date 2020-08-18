import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import statusCode from 'http-status-codes';
import dotenv from 'dotenv';

import routes from './router';

const app = express();

const APP_PORT = process.env.SERVER_PORT || 8000;

dotenv.config();

// Initialize morgan
app.use(morgan('tiny'));

// Parse incoming data
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(json());

// Handle cors error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(cors());

//API Routes

app.set('port', APP_PORT);

app.use('/api', routes);

// 404 error
app.use((req, res, next) => {
  next({
    msg: 'Page not found',
    status: statusCode.NOT_FOUND
  });
});

// Error
app.use((err, req, res, next) => {
  res.status(err.status || statusCode.BAD_REQUEST).json({
    error: true,
    message: err.msg || err.message || err.detail || err,
    status: err.status || statusCode.BAD_REQUEST,
    errors: err
  });
});

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
