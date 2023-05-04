var express = require('express');
var router = express.Router();

const Review = require('../models/Review.model');
const Product = require('../models/Product.model')

const { isLoggedIn } = require('../middleware/route-guard')

router.post('/add-review/:id', isLoggedIn, (req, res, next) => {

    Review.create({
        user: req.session.user._id,
        comment: req.body.comment,
    })
    .then((newReview) => {
        console.log("New review:", newReview)
        return Product.findByIdAndUpdate(
            req.params.id, 
            {
            $push: {reviews: newReview._id}
            }
        ,
        {new: true}
        )})
    .then((updatedProduct) => {
        console.log('Updated Product:', updatedProduct)
        res.redirect(`/product/product-details/${updatedProduct._id}`)
    })
    .catch((err) => {
        console.log(err)
    })


})

module.exports = router;