const config = require('./config');
const db = require('monk')(config.mongo.connection);

module.exports = db;
