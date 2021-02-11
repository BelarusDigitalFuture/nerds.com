import _get from 'lodash/get';
import React, {useEffect} from 'react';
import {connect, Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';

import Login from 'components/Login';
import Home from 'components/Home';
import UserProfile from 'components/UserProfile';
import Contest from 'components/Contest';
import Header from 'components/Header';
import Subjects from 'components/Subjects';
import Scoreboard from 'components/Scoreboard';
import Materials from 'components/Materials';
import NotFound from 'components/NotFound';

import 'antd/dist/antd.css';

import './styles.scss';
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {getCurrentUser} from "../../redux/actions/user.actions";

function App({ getCurrentUser, user }) {

  useEffect(() => {
    getCurrentUser({});
  }, []);

  return (
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Switch>
          <Route path="/login" component={Login} />
          <>
            <Header username={user.name} />

            <Switch>
              <Redirect exact from="/" to="/home" />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/profile" component={UserProfile} />
              <PrivateRoute path="/subject/:name" component={Subjects} />
              <PrivateRoute exact path="/contest/:contestId/task/:taskId" component={Contest} />
              <PrivateRoute exact path="/contest/:contestId/scoreboard" component={Scoreboard} />
              <PrivateRoute path="/contest/:contestId" component={Contest} />
              <PrivateRoute path="/materials/:materialId" component={Materials} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </>
        </Switch>
      </Layout>
    </Router>
  );
}

App.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  user: _get(state, 'user', {}),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

