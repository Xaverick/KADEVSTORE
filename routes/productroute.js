const express = require("express");
const router = express.Router();
const products = require('../controllers/products')
const catchAsync = require('../utils/catchAsync')


router.route('/')
    .get(products.index)

router.route('/:id')
    .get(catchAsync(products.showproduct))


module.exports = router;