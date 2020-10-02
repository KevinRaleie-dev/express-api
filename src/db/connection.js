/* eslint-disable no-console */
const mongoose = require('mongoose');

const db = () => {
  try {
    mongoose.Promise = global.Promise;

    // set up a connection
    mongoose
      .connect(process.env.MONGO_DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log('database connected ✍🏽'));
  } catch (error) {
    console.error(`database connection error: ${error.message}`);
  }
};

module.exports = db;
