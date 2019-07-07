import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from '../config/config';

dotenv.config();
const pool = new Pool({ connectionString:process.env.DB_URL });

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
        '$2b$10$Nb05xLfWP5a08cN959MIzumezo8CT14G6q8a1UPDviUD2VvgkOo96',
        true
);
DROP TABLE IF EXISTS Bus CASCADE;
CREATE TABLE Bus(
    id SERIAL NOT NULL PRIMARY KEY,
	number_plate VARCHAR NOT NULL,
	manufacturer VARCHAR NOT NULL,
	model VARCHAR NOT NULL,
	year VARCHAR NOT NULL,
	capacity INTEGER NOT NULL
);
INSERT INTO Bus (
  id, number_plate, manufacturer, model, year, capacity )
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
    id SERIAL NOT NULL PRIMARY KEY,
    trip_id SERIAL,
    bus_id SERIAL,
	origin VARCHAR NOT NULL,
	destination VARCHAR NOT NULL,
	trip_date TIMESTAMP DEFAULT NOW(),
	fare FLOAT(2) NOT NULL,
	status VARCHAR DEFAULT 'active'
); 
INSERT INTO Trip (
  id, trip_id, bus_id, origin, destination, fare, status )
   VALUES (
       1,
       1,
       1,
       'yaba',
       'ikeja',
       100,
       'active'
);
DROP TABLE IF EXISTS Booking CASCADE;
CREATE TABLE Booking(
    id SERIAL NOT NULL PRIMARY KEY,
    booking_id SERIAL,
	trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    bus_id INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    seat_number SERIAL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL
); 
INSERT INTO Booking (
  id, booking_id, trip_id, user_id, bus_id, seat_number, first_name, last_name, email )
   VALUES (
       1,
       1,
       1,
       1,
       1,
       1,
       'chuks',
       'emma',
       'boths'
);
`);

export default migrate;