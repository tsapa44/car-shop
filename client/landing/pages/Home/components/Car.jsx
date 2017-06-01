import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import './Car.scss';

export default class Car extends React.Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    condition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }

  render() {
    const { model, isAvailable, condition, price, image } = this.props;
    return (
      <div className="car__card">
        <div className="car__model">{model}</div>
        <div className={cx({
            'car__status': true,
            'car__status--available': isAvailable,
          })}
          title={condition} />
        <div className="car__image">
          <img className="car__pic" src={`client/static/images/${image}`} />
        </div>
        <div className={cx({
            'car__price': true,
            'car__price--no-available': !isAvailable,
          })}>
            <Link to={{
              pathname: '/order',
              search: `?model=${model}&passport=${localStorage.getItem('passport')}`
            }}>
              {`$${price}`}
            </Link>
        </div>
      </div>
    );
  }
}
