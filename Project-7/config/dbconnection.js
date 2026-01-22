
const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb+srv://prajapatijay0729_db_user:Jay_0716@cluster0.2m9kulu.mongodb.net/AdminAndBlogPassport?retryWrites=true&w=majority")
    .then(() => console.log("Database connected successfully..."))
    .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect;