import React from 'react';
import ReactDOM from 'react-dom';
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
            <a className="navbar-brand" href="index.html"><img src="./static/images/logo.png" /></a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={cx({
                  'active': window.location.pathname === '/',
                })}><a href="index.html">Home</a></li>
              <li className={cx({
                  'active': window.location.pathname === '/order',
                })}><a href="order.html">Order</a></li>
              <li className={cx({
                  'active': window.location.pathname === '/gallery',
                })}><a href="gallery.html">Gallery of cars</a></li>
        <li className={cx({
            'active': window.location.pathname === '/signin',
          })}><a href="signin.html">Sign in</a></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
