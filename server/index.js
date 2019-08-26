const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// const Redis = require('ioredis');
// const redis = new Redis();

const path = require('path');

// TODO
// set up redis
// add events for change room & update canvas
// emit room changes only to users in that room

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
  console.log('WOAH! a user connected');
  socket.on('change room', (room) => {
    console.log(room);
    // get room data from redis
    // send data back to user
  })

  socket.on('update', (canvas_data) => {

  })

  socket.on('disconnect', () => {
    // user disconnected
  })
})

// redis.set("name", "Yakub");
// redis.get("name", (err, name) => console.log(name));