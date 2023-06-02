const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getBlogsByUserId,
  getBlogsByBlogId,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

//all of params
router.param("userId", getUserById);

//all of actual routes
//create route
router.post("/blog/create/:userId", isSignedIn, isAuthenticated, createBlog);

//read routes
router.get("/blog/:userId", isSignedIn, isAuthenticated, getBlogsByUserId);
router.get(
  "/blog/:userId/:blogId",
  isSignedIn,
  isAuthenticated,
  getBlogsByBlogId
);

//delete route
router.delete("/blog/:userId/:blogId", isSignedIn, isAuthenticated, deleteBlog);

//update route
router.put("/blog/:userId/:blogId", isSignedIn, isAuthenticated, updateBlog);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
