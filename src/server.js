var express = require("express");
var app = express();

app.get("/api/info", function (req, res) {
  res.send("Hello World");
});

var server = app.listen(8083, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
