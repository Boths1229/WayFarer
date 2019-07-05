"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var trip = [{
  id: 1,
  trip_id: 1,
  bus_id: 1,
  origin: 'yaba',
  // starting location
  destination: 'ikeja',
  trip_date: Date(),
  fare: 100,
  status: 'active'
}, {
  origin: '',
  // starting location
  destination: 'egbeda',
  fare: 100
}, {
  origin: 'yaba',
  // starting location
  destination: 'egbeda',
  fare: ''
}];
var _default = trip;
exports["default"] = _default;