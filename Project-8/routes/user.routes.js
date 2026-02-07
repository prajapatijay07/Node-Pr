// const express = require("express");
// const {
//     userPage,
//     singleProduct,
//     viewProfile,
//     registerPage,
//     handleRegister,
//     loginPage,
//     handleLogin,
//     logoutUser,
//     forgotUserPasswordPage,
//     sendUserResetEmail,
//     UserverifyOTP,
//     resetUserPassword,
//     changeUserPasswordPage,
//     changeUserPassword,
//     addToCart,
//     viewCart,
//     // addToCart,
//     // showAddProductPage, 
//     // viewCart, 
//     removeFromCart,
//     addToFavourites,
//     viewFavourites,
//     removeFromFavourites
// } = require("../controller/user.controller");
// const routes = express.Router();
// const passport = require('passport');

// // Public Pages
// routes.get("/", userPage);
// routes.get("/single-product/:id", singleProduct);

// // Auth Pages
// routes.get("/register", registerPage);
// routes.post("/register", handleRegister);
// // Login Routes
// routes.get("/loginUser", loginPage);
// routes.post("/loginUser", handleLogin);
// // routes/user.js
// routes.get("/logoutUser", logoutUser);

// routes.get("/forgot-password", forgotUserPasswordPage);
// routes.post("/sendUserResetEmail", sendUserResetEmail);
// routes.post("/verifyUserotp", UserverifyOTP);
// routes.post("/resetUserPassword", resetUserPassword);

// // Add to cart by product ID
// routes.get("/add-cart/:id", addToCart);
// // View cart page
// routes.get("/cart", viewCart);
// routes.get("/cart/remove/:id", removeFromCart);


// // Add to favourite
// routes.get("/add-favourite/:id", addToFavourites);
// // View favourites
// routes.get("/favourite", viewFavourites);
// // Remove from favourite
// routes.get("/favourite/remove/:id", removeFromFavourites);


// // Favourite
// routes.get("/favourite/add/:id", addToFavourites);
// routes.get("/favourite/view", viewFavourites);
// routes.get("/favourite/remove/:id", removeFromFavourites);

// // User profile 
// routes.get('/view-profile',
//     passport.checkUserAuthenticated, viewProfile
// );

// // Change password 
// routes.get('/change-password',
//     passport.checkUserAuthenticated, changeUserPasswordPage
// );

// routes.post('/change-password',
//     passport.checkUserAuthenticated, changeUserPassword
// );


// module.exports = routes;


const express = require("express");
const routes = express.Router();
const passport = require("passport");
const {
  userPage,
  singleProduct,
  viewProfile,
  registerPage,
  handleRegister,
  loginPage,
  logoutUser,
  forgotUserPasswordPage,
  sendUserResetEmail,
  UserverifyOTP,
  resetUserPassword,
  changeUserPasswordPage,
  changeUserPassword,
  addToCart,
  viewCart,
  removeFromCart,
  addToFavourites,
  viewFavourites,
  removeFromFavourites
} = require("../controller/user.controller");

// Public pages
routes.get("/", userPage);
routes.get("/single-product/:id", singleProduct);

// Register
routes.get("/register", registerPage);
routes.post("/register", handleRegister);

// Login (🔥 USE PASSPORT)
routes.get("/loginUser", loginPage);
routes.post(
  "/loginUser",
  passport.authenticate("user-local", {
    successRedirect: "/user/view-profile",
    failureRedirect: "/user/loginUser",
    failureFlash: true
  })
);

// Logout
routes.get("/logoutUser", logoutUser);

// Password reset
routes.get("/forgot-password", forgotUserPasswordPage);
routes.post("/sendUserResetEmail", sendUserResetEmail);
routes.post("/verifyUserotp", UserverifyOTP);
routes.post("/resetUserPassword", resetUserPassword);

// Cart
routes.get("/add-cart/:id", addToCart);
routes.get("/cart", viewCart);
routes.get("/cart/remove/:id", removeFromCart);

// Favourite
routes.get("/add-favourite/:id", addToFavourites);
routes.get("/favourite", viewFavourites);
routes.get("/favourite/remove/:id", removeFromFavourites);

// Profile (🔒 PROTECTED)
routes.get("/view-profile", passport.checkAuthenticated, viewProfile);

// Change password
routes.get("/change-password", passport.checkAuthenticated, changeUserPasswordPage);
routes.post("/change-password", passport.checkAuthenticated, changeUserPassword);

module.exports = routes;
