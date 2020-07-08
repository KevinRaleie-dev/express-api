const express = require("express");
const router = express.Router();
let BlogPost = require("../models/blog.model");

router.route("/").get((req, res) => {
  BlogPost.find()
    .then((blogposts) => res.json(blogposts))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const blogTitle = req.body.blogTitle;
  const blogImage = req.body.blogImage;
  const blogContent = req.body.blogContent;

  const newBlogPost = new BlogPost({
    blogTitle,
    blogImage,
    blogContent,
  });

  newBlogPost
    .save()
    .then(() => res.json("Blog post added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
