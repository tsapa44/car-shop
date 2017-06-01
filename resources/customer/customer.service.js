const db = require('./../../db');
const userService = require('./../user/user.service');
const service = db.get('customer');

service.createCustomer = passport =>
  service.insert({ passport })
    .then(doc => userService.createUser(passport, passport, 'customer')
      .then((user) => userService.update({ _id: user._id }, {
        $set: {
          customerId: doc._id,
        },
      })));

service.getCustomer = passport =>
  service.findOne({ passport });

module.exports = service;
