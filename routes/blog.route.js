const express = require("express");
const router = express.Router();
let BlogPost = require("../models/blog.model");

router.route("/").get(async (req, res) => {
  await BlogPost.find()
    .then((blogposts) => res.json(blogposts))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post(async (req, res) => {
  const blogTitle = req.body.blogTitle;
  const blogImage = req.body.blogImage;
  const blogContent = req.body.blogContent;

  const newBlogPost = new BlogPost({
    blogTitle,
    blogImage,
    blogContent,
  });

  await newBlogPost
    .save()
    .then(() => res.json("Blog post added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get blogpost by the _id
router.route("/:id").get((req, res) => {
  BlogPost.findById(req.params.id)
    .then((blogpost) => res.json(blogpost))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// delete blogpost by the _id
router.route("/:id").delete(async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id)
    .then(() => res.json("Blog post deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// update a blogpost by the _id
router.route("/update/:id").patch(async (req, res) => {
  await BlogPost.findById(req.params.id)
    .then((blogpost) => {
      blogpost.blogTitle = req.body.blogTitle;
      blogpost.blogImage = req.body.blogImage;
      blogpost.blogContent = req.body.blogContent;

      blogpost
        .save()
        .then(() => res.json("Blog post updated"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
