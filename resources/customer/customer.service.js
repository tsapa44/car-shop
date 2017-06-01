const db = require('./../../db');
const service = db.get('customer');

service.createCustomer = passport =>
  service.insert({ passport });

service.getCustomer = passport =>
  service.findOne({ passport });

module.exports = service;
