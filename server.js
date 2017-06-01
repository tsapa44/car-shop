const restify = require('restify');
const serveStatic = require('serve-static-restify');
const request = require('request');
const carService = require('./resources/car/car.service');
const customerService = require('./resources/customer/customer.service');
const orderService = require('./resources/order/order.service');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/(order|signin|admin)$', restify.serveStatic({
  directory: __dirname,
  file: 'index.html',
}));

server.get('/cars', (req, res, next) => {
  carService.find().then(cars => res.send(200, cars));
  return next();
});

// server.get('/customer', (req, res, next) => {
//   customerService.getCustomer();
// })

server.get('/init/car', (req, res, next) => {
  carService.createCar('Land Rover Range', true, 'new', 240, 'car_1.jpeg');
  carService.createCar('Ford Kuga', true, 'new', 159.99, 'car_2.jpeg');
  carService.createCar('Infinity Q30', true, 'new', 195, 'car_3.jpeg');
  carService.createCar('Mercedes-Benz GL', true, 'new', 240.0, 'car_4.jpeg');
  carService.createCar('Nissan Qashqai', false, 'repairing', 174.99, 'car_5.jpeg');
  carService.createCar('Nissan Juke', true, 'new', 120, 'car_6.jpeg');
  carService.createCar('Renault Clio', true, 'new', 110, 'car_7.jpeg');
  carService.createCar('Huyndai Tucson', false, 'repairing', 164.99, 'car_8.jpeg');
  return next();
});

server.get('/init/customer', (req, res, next) => {
  customerService.createCustomer('MP1729578');
  customerService.createCustomer('MP1967932');
  customerService.createCustomer('MP9583721');
  customerService.createCustomer('MP0000001');
  return next();
})

server.post('/order', (req, res, next) => {
  const { model, passport, lease } = req.params;
  orderService.createOrder(model, passport, lease).then((doc) => res.send(201, doc));
  return next();
})

server.pre(serveStatic(__dirname));
server.listen(3005,
  () => console.log(`${server.name} listening at ${server.url}`)
);
