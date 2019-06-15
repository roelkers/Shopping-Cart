const express = require('express');
const router = express.Router();
const register = require('./register')
const users = require('./users')
const shop = require('./shop')
const login = require('./login')

router.use('/users', users)
router.use('/shop', shop)
router.use('/register', register)
router.use('/shop', shop)
router.use('/',login)

module.exports = router;