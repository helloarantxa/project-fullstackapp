var express = require('express');
var router = express.Router();

const Room = require('../models/Product.model');

const { isLoggedIn, isAdmin } = require('../middleware/route-guard')


router.get('/create-product', isAdmin, (req, res, next) => {
    
    res.render('create-product.hbs')
})

router.get('/all')
router.post('/create-product', isLoggedIn, (req, res, next) => {
    const { name, description, price, imageUrl } = req.body

    Product.create({
        name,
        description,
        price,
        imageUrl,
        owner: req.session.user._id
    })
    .then((createdProduct) => {
        console.log("New Room:", createdProduct)
        res.redirect(`/product/create-product/${createdProduct._id}`)
    })
    .catch((err) => {
        console.log(err)
    })
        

})

module.exports = router;