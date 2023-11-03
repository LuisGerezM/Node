const http = require("http");
const server = http.createServer();

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:5173" },
});

const { addUser, getUser, removeUser } = require("./helper");

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("create-room", (name) => {
    console.log("then room name received is ", name);
  });

  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });

    socket.join(room_id);

    if (error) {
      console.log("Join error", error);
    } else {
      console.log("Join user", user);
    }
  });

  socket.on("sendMessage", (message, room_id, callback) => {
    const user = getUser(socket.id);

    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };

    io.to(room_id).emit("message", msgToStore);

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log("listening on port:" + PORT);
});
