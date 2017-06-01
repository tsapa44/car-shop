import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import _ from 'lodash';
import Header from './../common/Header';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';
import Signin from './pages/Signin/Signin';

export default class App extends React.Component {
  componentWillMount() {
    localStorage.setItem('passport', 'MP0000001');
  }
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/signin" component={Signin} />
      </div>
    );
  }
}
