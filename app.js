const express = require("express")
const app = express();
const product = require("./routes/productroute")
const category = require("./routes/categoryroute")
const user = require("./routes/authroute")
const session = require('express-session');
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressError = require("./utils/expressError")



flash = require('express-flash')

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
app.use(flash());
app.use(cookieParser());
app.use(session(sessionparam));
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/', user);
app.use('/products', product);
app.use('/category', category);

app.all("*", (req, res, next) => {
    next(new expressError('page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = "Something went wrong"
    console.log("error")
})

const port = process.env.PORT || 4000;
app.listen(port, () =>{

    console.log("server strated")
})
