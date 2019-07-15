"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = process.env.NODE_ENV;
var pool = new _pg.Pool({
  connectionString: _config["default"].databaseUrl[env]
});
pool.on('error', function (err) {
  console.log(err);
});
var migrate = pool.query("DROP TABLE IF EXISTS users CASCADE;\nCREATE TABLE users(\n    id SERIAL NOT NULL PRIMARY KEY,\n    user_id SERIAL,\n\temail VARCHAR NOT NULL,\n\tfirst_name VARCHAR NOT NULL,\n\tlast_name VARCHAR NOT NULL,\n\tpassword VARCHAR NOT NULL,\n\tis_admin BOOLEAN NOT NULL DEFAULT false\n);\nINSERT INTO users (\n    id, user_id, email, first_name, last_name, password, is_admin\n    ) VALUES (\n         2,\n         2,\n        'boths@yahoo.com',\n        'chuks',\n        'emma',\n        'developer',\n        true\n);\nDROP TABLE IF EXISTS Bus CASCADE;\nCREATE TABLE Bus(\n    bus_id SERIAL,\n\tnumber_plate VARCHAR NOT NULL,\n\tmanufacturer VARCHAR NOT NULL,\n\tmodel VARCHAR NOT NULL,\n    year VARCHAR NOT NULL,\n    seat_number SERIAL,\n\tcapacity INTEGER NOT NULL\n);\nINSERT INTO Bus (\n  bus_id, number_plate, manufacturer, model, year, seat_number, capacity )\n   VALUES (\n       5,\n      'AGL 519 FE',\n      'toyota',\n      'corolla',\n      '2004',\n      1,\n       36\n);\nDROP TABLE IF EXISTS Trip CASCADE;\nCREATE TABLE Trip(\n    trip_id SERIAL,\n    bus_id SERIAL,\n\torigin VARCHAR NOT NULL,\n\tdestination VARCHAR NOT NULL,\n\ttrip_date TIMESTAMP,\n    fare FLOAT(2) NOT NULL,\n    number_plate VARCHAR NOT NULL,\n    capacity INTEGER NOT NULL,\n    model VARCHAR NOT NULL,\n\tstatus VARCHAR DEFAULT 'active'\n); \nINSERT INTO Trip (\n   trip_id, bus_id, origin, destination, trip_date, fare, number_plate, capacity, model, status )\n   VALUES (\n       1,\n       1,\n       'yaba',\n       'ikeja',\n       '2019-07-12 08:39:35 +0000',\n       100,\n       'AGL 519 FE',\n       36,\n       'corolla',\n       'active'\n);\nDROP TABLE IF EXISTS Booking CASCADE;\nCREATE TABLE Booking(\n    booking_id SERIAL,\n\ttrip_id INTEGER NOT NULL,\n    user_id INTEGER NOT NULL,\n    bus_id INTEGER NOT NULL,\n    trip_date TIMESTAMP,\n    seat_number INTEGER NOT NULL,\n    first_name VARCHAR NOT NULL,\n    last_name VARCHAR NOT NULL,\n    email VARCHAR NOT NULL\n); \nINSERT INTO Booking (\n   booking_id, trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email )\n   VALUES (\n       2,\n       1,\n       1,\n       1,\n       '2019-07-12 08:39:35 +0000',\n       1,\n       'chuks',\n       'emma',\n       'boths'\n);\n");
var _default = migrate;
exports["default"] = _default;