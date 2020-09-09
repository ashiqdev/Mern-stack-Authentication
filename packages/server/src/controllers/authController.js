/* eslint-disable */
import mongoose from 'mongoose';
import _ from 'lodash';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { createHash, transport, signToken } from '../utils/utils';
import { verifyEmailTemplate } from '../Mail-Templates';

const User = mongoose.model('User');

async function sendEmailVerification({ email, emailToken }) {
  // Send email with verification url
  await transport.sendMail({
    from: process.env.ADMIN_MAIL,
    to: email,
    subject: 'Email verification',
    html: verifyEmailTemplate({ email, emailToken }),
  });

  return { message: 'Verification url sent to your mail' };
}

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user is already taken
  const user = await User.findOne({ email });
  if (user)
    return res.status(400).json({ errors: [{ email: 'Email is taken' }] });

  console.log({ password });

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailToken = await createHash();
  const emailTokenExpiry = Date.now() + 3600000; // 1 hour from now

  const newUser = await new User({
    email,
    name,
    password: hashedPassword,
    emailToken,
    emailTokenExpiry,
  });
  await newUser.save();

  // send email to the user
  const { message } = await sendEmailVerification(newUser);
  return res.json({ message });
};

export const verifyUser = async (req, res) => {
  const { email, emailToken } = req.body;

  console.log({ emailToken });

  // find user
  const user = await User.findOne({
    emailToken,
    emailTokenExpiry: {
      $gte: Date.now() - 3600000,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json({ errors: [{ email: 'This link is either invalid or expired!' }] });
  }

  const verifiedUser = await User.findOneAndUpdate(
    { _id: user.id },
    {
      $set: {
        emailVerified: true,
        email: email || user.email,
        emailToken: '',
        emailTokenExpiry: Date.now(),
      },
    },
    { new: true }
  );

  return res.status(200).json({
    token: signToken(verifiedUser),
    user: verifiedUser,
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ errors: [{ email: 'No user found with this email!' }] });
  }
  
  const { emailVerified } = await User.findOne({ email }).select(
    '+emailVerified'
  );

  if (!emailVerified) {
    return res
      .status(404)
      .json({ errors: [{ email: 'You have to verify your email first' }] });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return res.status(404).json({ errors: [{ email: 'Invalid Password!' }] });
  }

  return res.status(200).json({
    token: signToken(user),
    user,
  });
};
