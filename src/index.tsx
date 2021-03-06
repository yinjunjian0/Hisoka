import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';

import Layout from './layout';
import * as serviceWorker from './serviceWorker';

import { storeContext, initialState, reducer } from './store'
import Provider from './store/Provider'

function App({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider store={{ state, dispatch }}>
      {children}
    </Provider>
  );
}

ReactDOM.render(
  <App>
    <Layout />
  </App>,
  document.getElementById('root')
);

serviceWorker.unregister();
