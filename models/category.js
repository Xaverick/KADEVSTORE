const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: String,
    images: String,

});

module.exports = mongoose.model('Categories', CategorySchema)