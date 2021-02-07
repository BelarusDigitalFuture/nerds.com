import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';

import store from 'redux/store';

import Login from 'components/Login';
import Home from 'components/Home';
import Contest from 'components/Contest';
import Header from 'components/Header';

import 'antd/dist/antd.css';

import './styles.scss';
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout style={{ height: '100%' }}>
          <Switch>
            <Route path="/login" component={Login} />
            <>
              <Header />

              <Switch>
                <Redirect exact from="/" to="/home" />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/contest/:id/task/:taskId" component={Contest} />
                <PrivateRoute path="/contest/:id" component={Contest} />
                <Route exact path="*" component={() => <div>root</div>} />
              </Switch>
            </>
          </Switch>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
