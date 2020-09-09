import { validationResult, check } from 'express-validator';

// function for validation rules
const userValidationRules = () => {
  return [
    //   username must not be empty
    check('name', 'name is required').trim().not().isEmpty(),
    check('email', 'email is not valid').trim().isEmail(),
    // password must be at least 6 chars long
    check('password', 'password must be 6 character long').isLength({ min: 6 }),
  ];
};

const signInValidationRules = () => {
  return [
    //   username must not be empty
    check('email', 'email is not valid').trim().isEmail(),
    // password must be at least 6 chars long
    check('password', 'password must be 6 character long').isLength({ min: 6 }),
  ];
};

// function for actual validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { userValidationRules, validate, signInValidationRules };
