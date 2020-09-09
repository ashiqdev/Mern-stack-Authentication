// import jwtDecode from 'jwt-decode';

export const loginUser = (response, next) => {
  const { token } = response;
  localStorage.setItem('jwtToken', token);
  next();
};

export const singout = (next) => {
  localStorage.removeItem('jwtToken');
  next();
};
