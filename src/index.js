/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./db/connection');
const blogPostRouter = require('./routes/blog/blog.route');
const routeHandler = require('./handlers/routeHandler');
const errorHandler = require('./handlers/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

const main = async () => {
  db();
  app.use(cors());
  app.use(helmet());
  app.use(morgan('common'));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  app.get('/', (_, res) => res.send('The server is live🙂🔥'));
  app.use('/blog', blogPostRouter);
  app.use(routeHandler);
  app.use(errorHandler);
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
};

main();
