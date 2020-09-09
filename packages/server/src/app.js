import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import { notFound } from './handlers/errorHandlers';

const app = express();

// development only
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(morgan('dev'));
}

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// After all that above middleware, we finally handle our own routes!
app.use('/api', routes);

app.use(notFound);

export default app;
