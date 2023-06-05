const express = require("express");
const { default: mongoose } = require("mongoose");
const product = require("./models/products");
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
    const products = new product({
        title: "boAt Airdopes 441 | Wireless Earbuds with 6mm Driver For Immersive Sound",    
        description: "Plug Into Nirvana with boAt Airdopes 441 TWS earbuds to enjoy your music in a truly wireless way. It has the IWP (Insta Wake N’ Pair) Technology, meaning as soon as one opens the charging case lid, the best earbuds power on and enter connection mode. The TWS Airdopes 441 come equipped with 6mm drivers for immersive sound. It offers a seamless user experience via its capacitive touch controls",
        price: 2499,
        images:"https://res.cloudinary.com/dkbsrsblc/image/upload/v1685860134/Products/earbuds-prod-4_brwc0l.webp",
        category: "watch"

    })
    
    await products.save();
    
}



seedDB().then(() =>{
    mongoose.connection.close();
})


