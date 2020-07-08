require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

try {
  mongoose.Promise = global.Promise;

  // set up a connection
  mongoose
    .connect(process.env.MONGO_DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("blog database connected ✍🏽"));
} catch (error) {
  console.error(`database connection error: ${error.message}`);
}

const app = express();
const port = process.env.PORT || 3000;

// logging with morgan
app.use(morgan("tiny"));

// middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/static/index.html"));

// routes
const blogPostRouter = require("./routes/blog.route");
app.use("/api/v1/blogposts", blogPostRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
