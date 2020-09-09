import React, { useState } from 'react';
import { ToastContainer, Toast, toast } from 'react-toastify';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuth } from '../helpers/auth';
import Protection from '../assets/Protection.svg';
import useInputState from '../hooks/useInputState';

const Register = () => {
  const initialValue = { name: '', email: '', password: '' };
  const [btnText, setBtnText] = useState('Sign Up');
  const [state, onChangeHandler, reset] = useInputState(initialValue);

  const { name, email, password } = state;

  //   submit data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${process.env.API_URL}/api/signup`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
    } catch (err) {
      const { errors } = err.response.data;
      for (const error of errors) {
        const msg = Object.values(error).toString();
        toast.error(msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign Up for MernAuth
            </h1>
            <form
              className="w-full flex-1 mt-8 text-indigo-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={onChangeHandler}
                  value={name}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChangeHandler}
                  value={email}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                  value={password}
                />

                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none border-none outline-none"
                  type="submit"
                >
                  <i className="fas fa-user-plus fa 1x w-6 -ml-2" />
                  <span className="ml-3">{btnText}</span>
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-node px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform tranlate-y-1/2">
                  Or sign in with email or social login
                </div>
              </div>

              <div className="flex flex-col items-center">
                <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  href="/login"
                  target="_self"
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" />
                  <span className="ml-4">Sign In</span>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${Protection})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
