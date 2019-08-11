const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Redis = require('ioredis');
const redis = new Redis();

const path = require('path');

server.listen(5700);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})

app.get('/index.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.js'));
})

app.get('/style.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/style.css'));
})



io.on('connection', (socket) => {


  socket.on('disconnect', () => {
    // user disconnected
  })
})

redis.set("name", "Yakub");
redis.get("name", (err, name) => console.log(name));