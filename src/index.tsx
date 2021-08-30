import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { store } from './components/store/store';
import App from './App';
import AppUseReducers from "./AppUseReducers";
import AppWithRedux from "./AppWithRedux";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<App />*/}
          {/*<AppUseReducers/>*/}
          <AppWithRedux/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
