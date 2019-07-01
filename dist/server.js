"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("idempotent-babel-polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _debug = _interopRequireDefault(require("debug"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config/config"));

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = (0, _express["default"])();
var port = _config["default"].port,
    env = _config["default"].env;
server.use((0, _morgan["default"])('dev'));
server.use(_bodyParser["default"].json());
server.use(_bodyParser["default"].urlencoded({
  extended: false
}));
server.use((0, _cors["default"])());
var Debug = (0, _debug["default"])('http'); // Routes(server);

server.use('/api/v1', _routes["default"]);
server.get('/', function (req, res) {
  res.json({
    message: 'welcome to default routes'
  });
});
server.listen(port, function () {
  Debug("Server starting on port: ".concat(port));
});
var _default = server;
exports["default"] = _default;