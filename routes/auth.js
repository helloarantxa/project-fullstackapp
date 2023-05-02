var express = require('express');
var router = express.Router();

router.get('/signup', (req, res, next) =>{
    res.render('auth/signup.hbs')
})

module.exports = router;