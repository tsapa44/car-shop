import React from 'react';
import ReactDOM from 'react-dom';
import './Signin.scss';

export default class Signin extends React.Component {
  state = {
    username: '',
    password: '',
    role: 'guest',
    isLogin: false,
  }
  onLogin = () => {
    $.ajax({
      url: `/login`,
      type: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      },
      success: () => {
        sessionStorage.setItem('username', this.state.username);
        sessionStorage.setItem('password', this.state.password);
        sessionStorage.setItem('role', this.state.role);
        this.setState({
          isLogin: true,
        });
      }
    });
  }

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeRole = e => {
    this.setState({
      role: e.target.value,
    });
  }

  render() {
    const username = this.state.isLogin ? sessionStorage.getItem('username') : '';
    return (
      <div>
        <div className="signin__welcome">
          <h3>Please, don't hack us</h3>
        </div>
        <div className="container__sign-in">
          <label className="sr-only">Email address</label>
          <input onChange={this.onChangeUsername} value={this.state.username} type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
          <label className="sr-only">Password</label>
          <input onChange={this.onChangePassword} value={this.state.password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="dropdown">
            <select value={this.state.lease} onChange={this.onChangeRole} className="form-control" id="sel2">
              <option value="guest">Guest</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div onClick={this.onLogin} className="signin__btn btn btn-success btn-block">Sign in</div>
        </div>
        {this.state.isLogin ? (
          <div className="signin__thanks">
            Welcome {username}!
          </div>
        ) : null}
      </div>
    );
  }
}
