const app = require("http").createServer();
const io = (module.exports.io = require("socket.io")(app));

const PORT = process.env.PORT || 3231;

const SocketManager = require("./SocketManager");

io.on("connection", SocketManager);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
