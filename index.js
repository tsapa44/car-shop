import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/landing/App';
import {  BrowserRouter as Router, Route } from 'react-router-dom';

require('./style.scss');
ReactDOM.render((
  <Router>
    <Route component={App} />
  </Router>
  ), document.getElementById('app'))
