"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../controller/User"));

var _validateCredentials = require("../middlewares/validateCredentials");

var _validateEmailExistence = _interopRequireDefault(require("../middlewares/validateEmailExistence"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUp = _User["default"].signUp;

var router = _express["default"].Router();

router.post('/auth/signup', _validateCredentials.validateRegisterationCredentials, _validateEmailExistence["default"], signUp);
var _default = router;
exports["default"] = _default;