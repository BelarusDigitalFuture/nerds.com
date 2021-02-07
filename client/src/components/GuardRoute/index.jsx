import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      auth === true
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);

GuardedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  auth: PropTypes.node.isRequired,
};

export default GuardedRoute;
