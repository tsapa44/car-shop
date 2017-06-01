const db = require('./../../db');
const service = db.get('user');

service.createUser = (username, password, role) =>
  service.insert({ username, password, role });

service.validateUser = (username, password, role) =>
  service.findOne({ username, password, role })
    .then(user => !!user);

module.exports = service;
