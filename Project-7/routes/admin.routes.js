const express = require("express");
const adminRoutes = express.Router();
const Admin = require("../model/admin.model");
const { 
    addAdminPage, addNewAdmin, 
    editAdminPage, updateAdmin, deleteAdmin, 
    viewAllAdminPage
} = require("../controller/admin.controller");

adminRoutes.get("/", (req, res) => res.redirect("/admin/view-admin"));

adminRoutes.get("/add-admin", addAdminPage);
adminRoutes.get("/view-admins", viewAllAdminPage);
adminRoutes.post("/add-admin", Admin.uploadImage, addNewAdmin);
adminRoutes.get("/edit-admin/:id", editAdminPage);
adminRoutes.post("/update-admin/:id", Admin.uploadImage, updateAdmin);
adminRoutes.get("/delete-admin/:id", deleteAdmin);

module.exports = adminRoutes;
