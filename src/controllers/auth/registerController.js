import HttpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';

import client from '@/config/database';
import * as userQueries from '@/services/queries/userQueries';
import hash from '@/services/auth/hashPassword';

export const create = async (req, res, next) => {
  const { email } = req.body;
  const date = new Date().toISOString();
  try {
    const user = await userQueries.getUserByEmail(email);
    if (user && user.length > 0) {
      return next({
        message: 'Email is already taken'
      });
    }
    const request = { ...req.body, password: hash(req.body.password), userId: uuid(), date: date };
    const createdUser = await userQueries.createUser(request);

    res.status(HttpStatus.CREATED).json({
      message: 'User registered',
      data: createdUser,
      status: HttpStatus.CREATED,
      error: false
    });
  } catch (error) {
    next(error);
  }
};
