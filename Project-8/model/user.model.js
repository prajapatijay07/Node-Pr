// // model/user.model.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,

//   cart: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       qty: { type: Number, default: 1 }
//     }
//   ],

//   favourites: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
//     }
//   ]
// });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, default: 1 }
    }
  ],
  favourites: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
