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

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _config = _interopRequireDefault(require("./config/config"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _swagger = _interopRequireDefault(require("../swagger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = (0, _express["default"])();
var port = _config["default"].port,
    env = _config["default"].env;
server.use((0, _morgan["default"])('dev'));
server.use(_bodyParser["default"].json());
server.use(_bodyParser["default"].urlencoded({
  extended: false
})); // use swagger-Ui-express for your app documentation endpoint

server.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
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