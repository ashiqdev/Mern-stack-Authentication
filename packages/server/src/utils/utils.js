import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import nodemailer from 'nodemailer';

const jwtValidator = (token) => jwt.verify(token, process.env.APP_SECRET);

const signToken = ({ id, name, email }) => {
  return jwt.sign(
    {
      id,
      name,
      email,
    },
    process.env.APP_SECRET
  );
};

const createHash = async () => {
  const randomBytesPromise = promisify(randomBytes);
  const hash = (await randomBytesPromise(20)).toString('hex');
  return hash;
};

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export { signToken, createHash, transport };
