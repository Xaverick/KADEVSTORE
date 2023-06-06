const express = require("express")
const app = express();
const home = require("./routes/homeroute")
const category = require("./routes/categoryroute")
const session = require('express-session');
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')


const MongoDBStore = require("connect-mongo");
const dbURL = process.env.Db_URL || 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});

const secret1 = process.env.SECRET || "thisismysecret";

const store = MongoDBStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret1
    }
});

const sessionparam = {
    store,
    name: 'session',
    secret: secret1,
    resave: false,
    saveUninitialized: true,
    // secure: true,
    cookie: {
        httpOnly: true,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionparam));
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

const port = 
app.listen(4000, () =>{
    console.log("server strated")
})