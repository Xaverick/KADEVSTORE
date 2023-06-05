const category = require('../models/category');

module.exports.index = async (req, res) => {
    const categories = await category.find();
    res.json(categories);
}

module.exports.showcategory = async (req, res) => {
    const categorys = await category.findById(req.params.id);
    res.json(categorys);
} 