var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

var io = require('socket.io')(server.listener);

server.register(require('inert'), function(err) {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    config: {
      id: 'hello',
      handler: function(request, reply) {
        return reply.file(__dirname + '/index.html');
      }
    }
  });

  server.start(function(err) {
    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});
