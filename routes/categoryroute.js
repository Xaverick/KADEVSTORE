const express = require("express");
const router = express.Router();
const category = require('../controllers/category')
const catchAsync = require('../utils/catchAsync')
router.route('/')
    .get(category.index)

router.route('/:id')
    .get(catchAsync(category.showcategory))

module.exports = router;