const restify = require('restify');
const serveStatic = require('serve-static-restify');
const request = require('request');
const carService = require('./resources/car/car.service');
const customerService = require('./resources/customer/customer.service');
const orderService = require('./resources/order/order.service');
const userService = require('./resources/user/user.service');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/(order|signin|admin)$', restify.serveStatic({
  directory: __dirname,
  file: 'index.html',
}));

server.get('/validate', (req, res, next) => {
  const { username, password } = req.params;
  userService.validateUser(username, password)
    .then(isAuthorized => {
      if (isAuthorized) {
        return res.send(200, isAuthorized);
      }
      return res.send(403, new Error('Not Authorized User'));
    })
    return next();
})

server.get('/cars', (req, res, next) => {
  carService.find().then(cars => res.send(200, cars));
  return next();
});

server.post('/order', (req, res, next) => {
  const { model, passport, lease } = req.params;
  orderService.createOrder(model, passport, lease).then((doc) => res.send(201, doc));
  return next();
});

server.post('/login', (req, res, next) => {
  const { username, password, role } = req.params;
  userService.validateUser(username, password, role)
    .then(isAuthorized => {
      if (isAuthorized) {
        return res.send(201, isAuthorized);
      }
    })
    return next();
});

server.post('/chat', (req, res, next) => {
  const { username, role } = req.params;
  // res.redirect({
  //   hostname: 'localhost',
  //   pathname: '/',
  //   port: 8181,                 // defaults to 80
  //   secure: false,             // sets https
  //   permanent: true,
  //   query: {
  //     username,
  //     role,
  //   },
  // }, next);
  res.redirect(`http://localhost:8181/?username=${username}&role=${role}`, next);
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
  customerService.createCustomer('MP1234');
  customerService.createCustomer('MP4321');
  customerService.createCustomer('MP1111');
  customerService.createCustomer('MP3333');
  return next();
});

server.get('/init/user', (req, res, next) => {
  userService.createUser('admin', 'admin', 'admin');
  userService.createUser('guest', 'guest', 'guest');
  userService.createUser('Anton', '12345', 'guest');
});

server.pre(serveStatic(__dirname));
server.listen(3005,
  () => console.log(`${server.name} listening at ${server.url}`)
);
