const express = require("express");
const blogRoutes = express.Router();
const Blog = require("../model/blog-model");

const {
  addBlogPage,
  viewAllBlogPage,
  addNewBlog,
  editBlogPage,
  updateBlog,
  deleteBlog,
  getBlogDetails,
} = require("../controller/blog.controller");

blogRoutes.get("/add-blog", addBlogPage);

blogRoutes.post(
  "/add-blog",
  Blog.uploadImage,
  addNewBlog
);

blogRoutes.get("/view-blogs", viewAllBlogPage);

blogRoutes.get("/view-blog/:id", getBlogDetails);

blogRoutes.get("/edit-blog/:id", editBlogPage);

blogRoutes.post(
  "/edit-blog/:id",
  Blog.uploadImage,
  updateBlog
);

blogRoutes.post("/delete-blog/:id", deleteBlog);

module.exports = blogRoutes;
