const express = require('express');
const port = 9005;
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require("connect-flash");
const dbconnection = require('./config/dbconnection');
const localSt = require("./config/strategies");
const flashConnect = require("./config/flashConnect");

const app = express();
dbconnection();
// middleware setup
app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Session middleware setup
app.use(session({
    name: 'test',
    secret: 'admin',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL HEADER DATA (Cart, Wishlist, User)
app.use((req, res, next) => {
    res.locals.cartCount = req.session.cart ? req.session.cart.length : 0;
    res.locals.favCount = req.session.favourites ? req.session.favourites.length : 0;
    res.locals.userData = req.user || null;
    next();
});


app.use(flashConnect.setFlash);

// Passport User Authentication Middleware (make sure these are functions)
app.use(passport.setAuthenticateUser); 

// Routes
app.use("/", require('./routes/index.routes'));

// Server start
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
