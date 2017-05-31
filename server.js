const restify = require('restify');
const serveStatic = require('serve-static-restify');
const request = require('request');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/', restify.serveStatic({
  directory: './',
  file: 'index.html',
}));

server.pre(serveStatic(__dirname));
server.listen(3005,
  () => console.log(`${server.name} listening at ${server.url}`)
);
