import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { store } from './store/store';
import AppWithRedux from "./AppWithRedux";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <AppWithRedux/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals();
