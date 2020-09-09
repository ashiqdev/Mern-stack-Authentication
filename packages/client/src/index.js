import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import App from './views/App';
import Register from './views/Register';
import Verify from './views/Verify';

function Container() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <App {...props} />} />
        <Route
          exact
          path="/signup"
          render={(props) => <Register {...props} />}
        />
        <Route exact path="/verify" component={Verify} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Container />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept('./views/App', () => {
    ReactDOM.render(<Container />, document.querySelector('#root'));
  });
}
