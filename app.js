const express = require("express")
const app = express();
const home = require("./routes/homeroute")
const category = require("./routes/categoryroute")
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

const dbURL = process.env.Db_URL || 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', home);
app.use('/category', category);

// app.use('/product', productRoutes)
// app.use('/category', categotyRoutes)


// app.get('/', (req, res) => {
//     res.render('./campground/home')
// })

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log("server strated")
})
