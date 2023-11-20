/* This code is setting up a server using Express.js and Socket.io. */
const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const PORT = 4000;

app.use(cors());

/* The code `const server = http.createServer(app);` 
creates an HTTP server using the Express app. */
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"],
    }
});

/* The code `io.on("connection", (socket) => { ... })` sets up 
an event listener for the "connection" event in Socket.io. */
io.on("connection", (socket) => {
    console.log(`User connected is ${socket.id}`)
    socket.on("send_message", (data) => {
        socket.emit("receive_message", data)
        socket.broadcast.emit("receive_message", data)
    })
})

/* The code `server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON `)
});` is starting the server and listening for incoming requests on the specified port. Once the
server is running, it will log a message to the console indicating that the server is running on the
specified port. */
server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`)
});