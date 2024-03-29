import React from "react";
import Router from '../src/router/index';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {

  return (
    <React.Fragment>
      <Provider store={store}>
        <Router />
      </Provider>
    </React.Fragment>
  )
}

export default App;