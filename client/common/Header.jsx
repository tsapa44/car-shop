import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from 'react-router-dom';
import cx from 'classnames';

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to='/'><img src="client/static/images/logo.png" /></Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={cx({ 'active': window.location.pathname === '/' })}>
                <Link to='/'>Home</Link>
              </li>
              <li className={cx({ 'active': window.location.pathname === '/order' })}>
                <Link to='/order'>Order</Link>
              </li>
              <li className={cx({ 'active': window.location.pathname === '/signin' })}>
                <Link to='/signin'>Sign in</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
