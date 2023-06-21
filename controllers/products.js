const Products = require('../models/products');


module.exports.index = async (req, res) => {
    const product = await Products.find();
    res.json(product);

}

module.exports.showproduct = async (req, res) => {
    const product = await Products.findById(req.params.id);
    res.json(product);
}    


