// const express = require("express");
// const port = 8005;
// const path = require("path");
// const dbconnect = require("./config/dbconnection");
// const cookieParser = require("cookie-parser");

// const app = express();
// dbconnect();

// app.set("view engine", "ejs");
// app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(cookieParser());

// app.set('views', path.join(__dirname, 'views'));
// app.use("/", require("./routes/index.routes"));
// app.use("/blog", require("./routes/blog.routes")); 

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });


const express = require('express');
const port = 8000;
const path = require('path');
const cookieParser = require('cookie-parser');
const dbconnect = require('./config/dbconnection');
dbconnect();
const session = require('express-session');
const passport = require('passport');
const localSt = require("./config/strategies");

const app = express();

// middleware
app.set("view engine", 'ejs');
app.use("/", express.static(path.join(__dirname, 'public')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(express.urlencoded());

app.use(session({
    name: 'test',
    secret: 'admin',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
// if (passport.setAuthenticateUser) {
//     app.use(passport.setAuthenticateUser);
// }

// routes
app.use("/", require('./routes/index.routes'));


app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})