import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Car from './components/Car';
import './Home.scss';

export default class Home extends React.Component {
  state = {
    cars: [],
  };

  getCars = () => {
    $.get('/cars', (data, status) => {
      if (status === 'success') {
        this.setState({ cars: data });
      } else {
        console.err('Bad request!');
      }
    })
  }

  componentWillMount() {
    this.getCars();
  }
  render() {
    const cars = this.state.cars.map(car => (
      <Car
        key={car._id}
        model={car.model}
        isAvailable={car.isAvailable}
        condition={car.condition}
        price={car.price}
        image={car.image}
      />
    ));
    return (
      <div>
        <div className="home__welcome">
          <h3>Start leasing your dream car today</h3>
        </div>
        <div className="home__cars">
          {cars}
        </div>
      </div>
    );
  }
}
