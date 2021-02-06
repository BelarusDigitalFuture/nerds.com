import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './styles/index.pcss';
import './styles/index.styles.css';
import './styles/index.fonts.css';

import Layout from './components/admin/layout';
import store from './resources/store';

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <Layout />
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('adminRoot') // eslint-disable-line
);
