require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require('helmet');

try {
  mongoose.Promise = global.Promise;

  // set up a connection
  mongoose
    .connect(process.env.MONGO_DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("database connected ✍🏽"));
} catch (error) {
  console.error(`database connection error: ${error.message}`);
}

const app = express();
const port = process.env.PORT || 3000;

// logging with morgan
app.use(morgan("common"));
app.use(helmet());

// middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("The server is live🙂🔥"));

// routes
const blogPostRouter = require("./routes/blog/blog.route");
app.use("/api/v1/blogposts", blogPostRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
