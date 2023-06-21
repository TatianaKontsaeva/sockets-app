const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8081",
  },
});

//маршруты для http
app.get("/", async (req, res) => {
  return res.send(123);
});

app.listen(3000, async () => {
  console.log("Server started");
});

//Запуск сокет-сервера
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === "secret") {
    next();
  } else {
    console.log(socket, "not auth");
    socket.emit("connection_error", {
      message: "not auth",
    });
  }
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.join("room:" + data.room_id);
    io.to("room:" + data.room_id).emit("message", data.message);
    socket.emit("message", data);
  });

  socket.on("message", (arg) => {
    console.log(arg);
  });

  socket.on("disconnect", (reason) => {
    console.log("socket out", reason);
  });
});

httpServer.listen(3001);
