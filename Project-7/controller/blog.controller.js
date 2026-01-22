const Blog = require("../model/blog-model");
const path = require("path");
const fs = require("fs");

const addBlogPage = (req, res) => {
  res.render("add-blog");
};

const viewAllBlogPage = async (req, res) => {
  try {
    let { category, search, page } = req.query;
    let query = {};

    // If category is selected
    // if (category && category !== "All") {
    //   query.category = decodeURIComponent(category).trim(); 
    // }
    if (category && category.trim() !== "" && category !== "All") {
      query.category = category.trim();
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { author: searchRegex },
      ];
    }


    let limit = 6;
    let currentPage = parseInt(page) || 1;
    let skip = (currentPage - 1) * limit;

    const totalBlogs = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

    let totalPages = Math.ceil(totalBlogs / limit);

    res.render("view-blogs", {
      blogs,
      category,
      search,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching blogs");
  }
};

const addNewBlog = async (req, res) => {
  try {
    if (req.file) {
      req.body.blogImage = req.file.filename;;
    }

    await Blog.create(req.body);
    res.redirect("/blogs/view-blogs");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

const editBlogPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("back");

    res.render("edit-blog", { blog });
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("back");

    if (req.file) {
      if (blog.blogImage) {
        const oldPath = path.join(__dirname, "..", "public", blog.blogImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      req.body.blogImage = req.file.filename;;
    }

    if (req.body.tags) {
      req.body.tags = req.body.tags.split(",").map(t => t.trim());
    }

    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/blogs/view-blogs");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("back");

    if (blog.blogImage) {
      const imgPath = path.join(__dirname, "..", "public", blog.blogImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blogs/view-blogs");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("back");

    res.render("blog/single-blog", { blog });
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
};

module.exports = {
  addBlogPage,
  viewAllBlogPage,
  addNewBlog,
  editBlogPage,
  updateBlog,
  deleteBlog,
  getBlogDetails,
};
