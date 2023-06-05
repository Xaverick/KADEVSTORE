const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    price: Number,
    images:String,
    description: String,
    category: String,
    

});

module.exports = mongoose.model('Products', ProductSchema)