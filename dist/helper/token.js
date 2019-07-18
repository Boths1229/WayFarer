"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createToken = function createToken(data) {
  var token = _jsonwebtoken["default"].sign(data, 'secret', {
    expiresIn: '1h'
  });

  return token;
};

exports.createToken = createToken;

var verifyToken = function verifyToken(req, res, next) {
  // const token = req.headers.authorization || req.params.token || req.headers['x-access-token'] || req.body.token;
  var token = req.headers['x-access-token'] || req.headers.token || req.body.token;

  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found'
    });
  }

  return _jsonwebtoken["default"].verify(token, 'secret', function (error, user) {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'token is invalid'
      });
    }

    req.user = user;
    next();
  });
};

exports.verifyToken = verifyToken;