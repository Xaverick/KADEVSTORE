const express = require("express");
const router = express.Router();
const category = require('../controllers/category')

router.route('/')
    .get(category.index)

router.route('/:id')
    .get(category.showcategory)

module.exports = router;