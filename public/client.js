//
// reloads page on html and css file changes
//
socket = io.connect('/');
socket.on("reload", function () {
  location.reload();
});
