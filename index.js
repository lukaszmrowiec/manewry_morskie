const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const port = process.env.PORT || 5000;

server.listen(port);
console.log('http server listening on %d', port);
let playerID = 0;

io.on('connection', (socket) => {
  socket.on('setPlayer', () => {
    playerID += 1;
    socket.emit('setPlayer', JSON.stringify(playerID));
    if (playerID === 2) {
      playerID = 0;
    }
  });
  socket.on('gameControl', (mes) => {
    io.emit('gameControl', mes);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('connect_failed', () => {
    console.log('Sorry, there seems to be an issue with the connection!');
  });
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('view option', { layout: false });
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index.html');
});
app.get('/instrukcja', (req, res) => {
  res.render('instrukcja.html');
});
app.get('/index', (req, res) => {
  res.render('index.html');
});
app.get('/graczA', (req, res) => {
  res.render('graczA.html');
});
app.get('/graczB', (req, res) => {
  res.render('graczB.html');
});
