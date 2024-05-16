import express from 'express';
import logger from 'morgan';
import { connect } from './config/db.js';
import { restRouter } from './api/index.js';

const app = express();

connect();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', restRouter);
app.get('/', (req, res) => {
  res.send({ message: 'welcome to the our application' });
});
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
app.use((req, res, next) => {
  res.status(error.status || 500);
  return res.json({ error: { message: error.message } });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
