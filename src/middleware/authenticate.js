import { verify } from 'jsonwebtoken';
import HttpToken from 'http-status-codes';
import * as userQueries from '@/services/queries/userQueries';

export default (req, res, next) => {
  // Gather the access token from the request header
  const token = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token'];

  // if there isn't any token
  if (token == null)
    return res.status(HttpToken.UNAUTHORIZED).json({
      error: true,
      data: null,
      message: 'Not Authorized'
    });

  // verify token if provided
  verify(token, process.env.TOKEN_SECRET, async (error, data) => {
    if (error)
      return next({
        message: 'Not Authorized',
        error: true,
        status: HttpToken.UNAUTHORIZED
      });

    const user = await userQueries.getUserByEmail(data.email);
    // if no credentials found
    if (user && user.length <= 0) {
      return next({
        message: 'No such credentials found',
        error: true,
        status: HttpToken.UNAUTHORIZED
      });
    }

    // if no email match
    if (user[0].email !== data.email) {
      next({
        message: 'Not Authorized',
        error: true,
        status: HttpToken.UNAUTHORIZED
      });
    }

    req.headers = { ...req.headers, userId: user[0].user_id };
    next(); // pass the execution
  });
};
