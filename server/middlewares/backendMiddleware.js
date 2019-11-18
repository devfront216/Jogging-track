/* eslint-disable no-console */
// set up backend
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config');
const apiRoutes = require('../api/routes');

module.exports = (app, cb) => {
  mongoose.Promise = global.Promise;
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  console.log(config.mongoURL);
  mongoose.connect(config.mongoURL, { useMongoClient: true }, error => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
    console.log('Connected to MongoDB'); // eslint-disable-line

    if (typeof cb === 'function') {
      cb();
    }
  });

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use('/api', apiRoutes);
};
