import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from '../config/config';

dotenv.config();
const env = process.env.NODE_ENV;
const pool = new Pool({ connectionString: config.databaseUrl[env] });

pool.on('error', (err) => {
  console.log(err);
});

const migrate = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id SERIAL,
	email VARCHAR NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO users (
    id, user_id, email, first_name, last_name, password, is_admin
    ) VALUES (
         2,
         2,
        'boths@yahoo.com',
        'chuks',
        'emma',
        'developer',
        true
);
DROP TABLE IF EXISTS Bus CASCADE;
CREATE TABLE Bus(
    bus_id SERIAL,
	number_plate VARCHAR NOT NULL,
	manufacturer VARCHAR NOT NULL,
	model VARCHAR NOT NULL,
    year VARCHAR NOT NULL,
	capacity INTEGER NOT NULL
);
INSERT INTO Bus (
  bus_id, number_plate, manufacturer, model, year, capacity )
   VALUES (
       5,
      'AGL 519 FE',
      'toyota',
      'corolla',
      '2004',
       36
);
DROP TABLE IF EXISTS Trip CASCADE;
CREATE TABLE Trip(
    trip_id SERIAL,
    bus_id SERIAL,
	origin VARCHAR NOT NULL,
	destination VARCHAR NOT NULL,
	trip_date TIMESTAMP,
    fare FLOAT(2) NOT NULL,
    number_plate VARCHAR NOT NULL,
    capacity INTEGER NOT NULL,
    model VARCHAR NOT NULL,
	status VARCHAR DEFAULT 'active'
); 
INSERT INTO Trip (
   trip_id, bus_id, origin, destination, trip_date, fare, number_plate, capacity, model, status )
   VALUES (
       1,
       1,
       'yaba',
       'ikeja',
       '2019-07-12 08:39:35 +0000',
       100,
       'AGL 519 FE',
       36,
       'corolla',
       'active'
);
DROP TABLE IF EXISTS Booking CASCADE;
CREATE TABLE Booking(
    booking_id SERIAL NOT NULL,
	trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    bus_id INTEGER NOT NULL,
    trip_date TIMESTAMP,
    seat_number INTEGER,
    number_plate VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL
); 
INSERT INTO Booking (
   booking_id, trip_id, user_id, bus_id, trip_date, seat_number, number_plate, model, first_name, last_name, email )
   VALUES (
       2,
       1,
       1,
       1,
       '2019-07-12 08:39:35 +0000',
       1,
       'AGL 519 FE',
       'corolla',
       'chuks',
       'emma',
       'boths'
);
`);

export default migrate;