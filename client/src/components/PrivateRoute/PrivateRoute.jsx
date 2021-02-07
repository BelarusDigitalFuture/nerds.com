import React from 'react';
import {
  withRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import { Cookies, withCookies } from 'react-cookie';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isAuthorized = props.cookies.get('is_authenticated');

  return <Route
    {...rest}
    render={(props) => {
      return isAuthorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    }}
  />;
};

PrivateRoute.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
  ]).isRequired,
};

export default withRouter(withCookies(PrivateRoute));
