import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './Order.scss';

const month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

export default class Order extends React.Component {
  state = {
    model: '',
    passport: '',
    lease: +new Date(),
    isSend: false,
  }
  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  createDateString = date =>
    `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  onChangeModel = e => {
    this.setState({
      model: e.target.value,
    });
  }

  onChangePassport = e => {
    this.setState({
      passport: e.target.value,
    });
  }

  onChangeLease = e => {
    this.setState({
      lease: +e.target.value,
    })
  }

  componentWillMount() {
    const model = this.getParameterByName('model') || '';
    const passport = this.getParameterByName('passport') || '';
    this.setState({
      model,
      passport,
    });
  }

  createOrder = () =>
    $.ajax({
      url: `/order`,
      type: 'POST',
      data: {
        model: this.state.model,
        passport: this.state.passport,
        lease: new Date(this.state.lease),
      },
      success: () => {
        this.setState({
          isSend: true,
        });
      }
    });


  render() {
    const leaseDates = Array(10).fill(0).map((nul, idx) => {
      const timestamp = +new Date() + idx * 24 * 60 * 60 * 1000;
      const newDate = new Date(timestamp);
      const dateString = this.createDateString(newDate);
      const newDayTimestamp = Date.parse(dateString);
      return (
        <option value={newDayTimestamp} key={newDayTimestamp}>
          {dateString}
        </option>
      );
    });


    return (
      <div>
        <div className="order__welcome">
          <h3>Lease your future car</h3>
        </div>
        <section className="main-section">
          <div className="form-group">
            <input
              onChange={this.onChangeModel}
              value={this.state.model}
              type="text"
              className="form-control"
              id="model"
              placeholder="Model"
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.onChangePassport}
              value={this.state.passport}
              type="text"
              className="form-control"
              id="passport"
              placeholder="Passport"
            />
          </div>
          <div className="dropdown">
            <select value={this.state.lease} onChange={this.onChangeLease} className="form-control" id="sel2">
              {leaseDates}
            </select>
          </div>
          <input onClick={this.createOrder} type="submit" value="Give me car!" className="btn btn-success" />
        </section>
          {this.state.isSend ? (
            <div className="order__thanks">
              Order was created!
            </div>
          ) : null}
      </div>
    );
  }
}
