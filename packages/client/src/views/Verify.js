import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect, withRouter } from 'react-router-dom';
import { loginUser } from '../helpers/auth-2';

const Verify = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { location, history } = props;
  const { token, email } = queryString.parse(location.search);
  return (
    <div>
      <p>{token}</p>
      <p>{email}</p>
    </div>
  );
};

export default Verify;
