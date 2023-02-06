const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

// array to store chat logs
let chatLogs = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// endpoint to retrieve chat logs
app.get("/messages", (req, res) => {
  res.send(chatLogs);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  
  socket.on("chat message", (msg) => {
    console.log(`message: ${msg}`);
    chatLogs.push(msg); // add new message to chat logs array
    io.emit("chat message", msg);
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

  
http.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
