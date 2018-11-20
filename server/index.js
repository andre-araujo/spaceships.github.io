const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const players = [];

io.on('connection', function(socket){
  let playerIndex =
  socket.emit('update', players);
  socket.on('player', (playerData) => {
    const index = players.findIndex(pl => pl.id === playerData.id);

    if(index > -1) {
      players[index] = playerData;
    } else {
      players.push(playerData);
    }

    playerIndex = index;

    socket.emit('update', players);
  });

  socket.on('disconnect', function(){
    players.splice(playerIndex, 1);
  });
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
