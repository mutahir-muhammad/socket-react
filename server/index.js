const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const PORT = 4000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"],
    }
});

io.on("connection", (socket) => {
    console.log(`User connected is ${socket.id}`)
    socket.on("send_message", (data) => {
        socket.emit("receive_message", data)
        socket.broadcast.emit("receive_message", data)
    })
})

server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`)
});