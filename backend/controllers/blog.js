const Blog = require("../models/blog");
const { listeners } = require("../models/user");

exports.getBlogsByUserId = async (req, res) => {
  console.log("getBlogsByUserId is triggered");
  console.log(req.params.userId);
  const blog = await Blog.find({ userId: req.params.userId });
  console.log(blog);
  if (!blog) {
    return res.status(400).json({
      error: "No blog was found in DB",
    });
  }

  return res.json(blog);
};

exports.getBlogsByBlogId = async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  console.log(blog);
  if (!blog) {
    return res.status(400).json({
      error: "No blog was found in DB",
    });
  }

  return res.json(blog);
};

exports.createBlog = async (req, res) => {
  console.log("Create blog is triggered");
  const blog = new Blog(req.body);

  Blog.create(blog)
    .then((blog) => {
      res.json({
        title: blog.title,
        content: blog.content,
        userId: blog.userId,
        id: blog._id,
      });
    })
    .catch((error) => {
      // Handle the error
      console.error("Error creating blog:", error);
      res.status(400).json({ error: "Failed to create blog" });
    });
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: req.params.blogId },
    req.body,
    {
      new: true,
      upsert: true,
    }
  );
  if (!blog) {
    return res.status(400).json({
      error: "Unable to update this blog",
    });
  }
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  console.log("deleteBlog is triggered");
  // let blog = req.blog;

  const blog = (await Blog.deleteOne({ _id: req.params.blogId })).acknowledged;

  if (!blog) {
    return res.status(400).json({
      error: "Failed to delete this blog",
    });
  }
  return res.json({
    message: "Successfully deleted",
  });
};
