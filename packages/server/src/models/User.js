import mongoose from 'mongoose';

// user Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    emailToken: {
      type: String,
      select: false,
    },

    emailTokenExpiry: {
      type: Number,
      select: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
      select: false,
    },

    role: {
      type: String,
      default: 'Normal',
    },

    resetPasswordLink: {
      type: String,
      default: '',
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
