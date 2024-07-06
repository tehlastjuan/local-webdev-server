const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const chokidar = require("chokidar");
const path = require("path");
const port = 3000; // choose port number

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const watcher = chokidar.watch(
  [
    // add filepaths to watch for changes => reload
    path.join(__dirname, "public/index.html"),
    path.join(__dirname, "public/css/style.css"),
  ],
  {
    persistent: true,
  },
);

watcher.on("change", path => {
  console.log(`changes on ${path}`); // comment out if too verbose
  io.sockets.emit("reload");
});
