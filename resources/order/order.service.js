const db = require('./../../db');
const service = db.get('order');

service.createOrder = (model, passport, lease) =>
  service.insert({ model, passport, lease });

module.exports = service;
