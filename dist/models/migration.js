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

var pool = new _pg.Pool({
  connectionString: process.env.DB_URL
});
pool.on('error', function (err) {
  console.log(err);
});
var migrate = pool.query("DROP TABLE IF EXISTS users CASCADE;\nCREATE TABLE users(\n    id SERIAL NOT NULL PRIMARY KEY,\n    user_id SERIAL,\n\temail VARCHAR NOT NULL,\n\tfirst_name VARCHAR NOT NULL,\n\tlast_name VARCHAR NOT NULL,\n\tpassword VARCHAR NOT NULL,\n\tis_admin BOOLEAN NOT NULL DEFAULT false\n);\nINSERT INTO users (\n    id, user_id, email, first_name, last_name, password, is_admin\n    ) VALUES (\n         2,\n         2,\n        'boths@yahoo.com',\n        'chuks',\n        'emma',\n        '$2b$10$Nb05xLfWP5a08cN959MIzumezo8CT14G6q8a1UPDviUD2VvgkOo96',\n        true\n);\nDROP TABLE IF EXISTS Bus CASCADE;\nCREATE TABLE Bus(\n    id SERIAL NOT NULL PRIMARY KEY,\n\tnumber_plate VARCHAR NOT NULL,\n\tmanufacturer VARCHAR NOT NULL,\n\tmodel VARCHAR NOT NULL,\n\tyear VARCHAR NOT NULL,\n\tcapacity INTEGER NOT NULL\n);\nINSERT INTO Bus (\n  id, number_plate, manufacturer, model, year, capacity )\n   VALUES (\n       5,\n      'AGL 519 FE',\n      'toyota',\n      'corolla',\n      '2004',\n       36\n);\nDROP TABLE IF EXISTS Trip CASCADE;\nCREATE TABLE Trip(\n    id SERIAL NOT NULL PRIMARY KEY,\n    trip_id SERIAL,\n    bus_id SERIAL,\n\torigin VARCHAR NOT NULL,\n\tdestination VARCHAR NOT NULL,\n\ttrip_date TIMESTAMP DEFAULT NOW(),\n\tfare FLOAT(2) NOT NULL,\n\tstatus VARCHAR DEFAULT 'active'\n); \nINSERT INTO Trip (\n  id, trip_id, bus_id, origin, destination, fare, status )\n   VALUES (\n       1,\n       1,\n       1,\n       'yaba',\n       'ikeja',\n       100,\n       'active'\n);\nDROP TABLE IF EXISTS Booking CASCADE;\nCREATE TABLE Booking(\n    id SERIAL NOT NULL PRIMARY KEY,\n\ttrip_id INTEGER NOT NULL,\n\tuser_id INTEGER NOT NULL,\n\tcreated_on TIMESTAMP DEFAULT NOW()\n); \nINSERT INTO Booking (\n  id, trip_id, user_id )\n   VALUES (\n       2,\n       3,\n       4\n);\n");
var _default = migrate;
exports["default"] = _default;