import * as userQueries from '@/services/queries/userQueries';
import validatePassword from '@/services/auth/validatePassword';
import generateToken from './generateToken';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userQueries.getUserByEmail(email);
    const { userEmail, userPassword } = user[0];

    // check if email exists
    if ((user && user.length <= 0) || !user) {
      return next({
        message: 'No such credentials found'
      });
    }

    //check if given password is valid
    if (!validatePassword(password, userPassword)) {
      return next({
        message: 'No such credentials found'
      });
    }

    //generate jwttoken
    const token = generateToken(userEmail);

    res.status(200).json({
      message: 'User Login',
      error: false,
      data: {
        email: email
      },
      token
    });
  } catch (error) {
    next(error);
  }
};
