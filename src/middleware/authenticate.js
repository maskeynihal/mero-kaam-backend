import { verify } from 'jsonwebtoken';
import HttpToken from 'http-status-codes';
import * as userQueries from '@/services/queries/userQueries';

export default async (req, res, next) => {
  // Gather the jwt access token from the request header
  const token = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token'];
  // const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(HttpToken.UNAUTHORIZED).json({
      error: true,
      data: null,
      message: 'Not Authorized'
    }); // if there isn't any token

  verify(token, process.env.TOKEN_SECRET, async (error, data) => {
    if (error)
      return next({
        message: 'Not Authorized',
        error: true,
        status: HttpToken.UNAUTHORIZED
      });

    const user = await userQueries.getUserByEmail(data.email);
    if (user && user.length <= 0) {
      return next({
        message: 'No such credentials found',
        error: true,
        status: HttpToken.UNAUTHORIZED
      });
    }
    if (user[0].email !== data.email) {
      next({
        message: 'Not Authorized',
        error: true,
        status: HttpToken.UNAUTHORIZED
      });
    }
    next(); // pass the execution off to whatever request the client intended
  });
};
