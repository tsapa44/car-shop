const $ = require('jquery');

$(function () {
  var socket = io();
  socket.join('admin');
  $('form').submit(function(){
    console.log('submit');
    socket.to('admin').emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
});
