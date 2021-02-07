import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Layout } from 'antd';

import store from 'redux/store';

import Login from 'components/Login';
import Home from 'components/Home';
import Contest from 'components/Contest';
import Header from 'components/Header';

import 'antd/dist/antd.css';

import './styles.scss';

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
                <Route path="/home" component={Home} />
                <Route path="/contest/:id/task/:taskId" component={Contest} />
                <Route path="/contest/:id" component={Contest} />
                <Route component={() => <div>root</div>} />
              </Switch>
            </>
          </Switch>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
