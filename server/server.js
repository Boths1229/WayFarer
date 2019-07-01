import 'idempotent-babel-polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import debug from 'debug';
import cors from 'cors';
import config from './config/config';
import Routes from './routes/routes';


const server = express();

const { port, env } = config;

server.use(logger('dev'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));


server.use(cors());

const Debug = debug('http');
// Routes(server);
server.use('/api/v1', Routes);

server.get('/', (req, res) => {
  res.json({ message: 'welcome to default routes' });
});

server.listen(port, () => {
  Debug(`Server starting on port: ${port}`);
});

export default server;