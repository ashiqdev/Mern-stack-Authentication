import * as cookie from 'js-cookie';

// set Cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};

// Remove cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get cookie
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

// set cookie in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove cookie from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Authenticate user
export const authenticate = (response, next) => {
  const { token, user } = response.data;
  setCookie('token', token);
  setLocalStorage('user', user);
  next();
};

// Logout user
export const signout = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

// Get user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    const UserExists = localStorage.getItem('user');
    if (cookieChecked) {
      if (UserExists) {
        return JSON.parse(UserExists);
      }
      return false;
    }
  }
};

// update user data
// TODO need refactoring

export const updateUser = (response, next) => {
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};
