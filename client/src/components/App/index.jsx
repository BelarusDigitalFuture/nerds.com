import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import store from '../../redux/store';

import 'antd/dist/antd.css';

import './styles.scss';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/about">
            <>about</>
          </Route>
          <Route path="/users">
            <>users</>
          </Route>
          <Route path="/">
            <>home</>
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
