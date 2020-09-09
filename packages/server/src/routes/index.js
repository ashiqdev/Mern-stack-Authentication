import express from 'express';
import { catchErrors } from '../handlers/errorHandlers';
import { signup, verifyUser, signin } from '../controllers/authController';
import {
  userValidationRules,
  validate,
  signInValidationRules,
} from '../utils/validator';

const router = express.Router();

router.post('/signup', userValidationRules(), validate, catchErrors(signup));

router.post('/verify', catchErrors(verifyUser));

router.post('/signin', signInValidationRules(), validate, catchErrors(signin));

export default router;
