const express = require("express");
const { default: mongoose } = require("mongoose");
const category = require("./models/category");
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const dbURL = process.env.Db_URL || 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});

const seedDB = async() => {     
    const categories = new category({
        images:"https://res.cloudinary.com/dkbsrsblc/image/upload/v1685860165/Products/cat-3_a90vgm.jpg",
        category: "watch"

    })
    
    await categories.save();
    
}

//first 5 data inserted from excel table 4 headphones and 1 earphone

seedDB().then(() =>{
    mongoose.connection.close();
})