const mongoose = require('mongoose');

const dbconnection = ()=>{
    mongoose.connect("mongodb+srv://app_user:Jay_0716@cluster0.2m9kulu.mongodb.net/API-FLOW?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Database connected successfully");
    }).catch((error)=>{
        console.log("Database connection error",error);
        
    })
}
module.exports = dbconnection();

