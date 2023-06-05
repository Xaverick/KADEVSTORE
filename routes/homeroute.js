const express = require("express");
const router = express.Router();
const products = require('../controllers/products')



router.route('/')
    .get(products.index)

router.route('/product/:id')
    .get(products.showproduct)


module.exports = router;