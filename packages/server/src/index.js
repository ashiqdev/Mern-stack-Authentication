import mongoose from 'mongoose';

// Import all of our models
// require('./models/User');
import './models/User';

// start our app
import app from './app';

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`EROR → ${err.message}`);
});

const port = process.env.API_PORT || 3000;

app.set('port', port);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
