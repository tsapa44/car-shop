const db = require('./../../db');
const service = db.get('car');

service.createCar = (model, isAvailable, condition, price, image) =>
  service.insert({
    model,
    isAvailable,
    condition,
    price,
    image,
  });

module.exports = service;
