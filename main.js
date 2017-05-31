import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/landing/App';
import { Router, Route, Link, browserHistory } from 'react-router';

require('./style.scss');
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
  ), document.getElementById('app'))
