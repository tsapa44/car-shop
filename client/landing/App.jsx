import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom';
import $ from 'jquery';
import _ from 'lodash';
import Header from './../common/Header';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';
import Signin from './pages/Signin/Signin';

export default class App extends React.Component {
  getCookie = (cname) => {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return '';
  }

  componentDidMount() {
    const d = new Date();
    const nextDay = new Date(+d + 24 * 60 * 60 * 1000);
    let counter = +this.getCookie('visitCounter');
    document.cookie = `lastVisit=${d.toUTCString()};expires=${nextDay.toUTCString()};path=/`;
    document.cookie = `visitCounter=${counter + 1};expires=${nextDay.toUTCString()};path=/`;
  }
  render() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');

    // $.get('/validate', (data, status) => {
    //   console.dir(data);
    //   console.dir(status);
    //   if (status !== 'success') {
    //     location.replace('[::]:3005/signin');
    //   }
    // });
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
