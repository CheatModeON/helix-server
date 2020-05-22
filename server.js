var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

io.sockets.on('connection',
  function (socket) {
    console.log("new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('state',
      function(data) {
        console.log("Received: 'state' " + data.y + " " + data.status);
      
        socket.broadcast.emit('state', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      }
    );
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
