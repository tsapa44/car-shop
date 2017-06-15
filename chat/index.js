var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('room', (data) => {
    if (data.room === 'admin') {
      socket.join('admin');
    }
  })
  console.log('User connected');
    socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('chat message', function(data){
    if (data.role !== 'admin') {
      console.log('test');
      io.to('admin').emit('chat message', {
        message: data.message,
        username: data.username,
        role: data.role,
      });
    } else {
      io.emit('chat message', {
        message: data.message,
        username: data.username,
        role: data.role,
      });
    }
  });
});

http.listen(8181, function(){
  console.log('listening on: 8181');
});
