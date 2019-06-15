const router = require('express').Router();
const auth = require('../auth');

router.get('/', auth.optional, (req, res, next) => {
    res.render('../views/login')
})

module.exports = router