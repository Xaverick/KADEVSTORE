const express = require("express");
const router = express.Router();
const auth = require('../controllers/user');
const catchAsync = require('../utils/catchAsync')

router.route('/login')
    .get(catchAsync(auth.userdetail))
    .post(catchAsync(auth.login))

router.route('/register')
    .post(catchAsync(auth.register))

router.route('/logout')
    .post(auth.logout)

    
module.exports = router;