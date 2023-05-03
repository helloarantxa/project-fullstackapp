var express = require('express');
var router = express.Router();

const Product = require('../models/Product.model');

const { isLoggedIn, isAdmin } = require('../middleware/route-guard')


router.get('/create-product', isAdmin, (req, res, next) => {
    Product.find({owner: req.session.user._id}).then((foundProducts)=>{
        console.log(foundProducts);
        res.render('create-product.hbs', { foundProducts })
    }).catch((err) => {
        console.log(err);
//   console.log('New Product:', createdProduct);
})

});
    // res.render('create-product.hbs')


router.post('/create-product', isLoggedIn, (req, res, next) => {
    const { name, description, price, imageUrl } = req.body

    Product.create({
        name,
        description,
        price,
        imageUrl,
        owner: req.session.user._id,
      })

      .then((createdProduct) => {
            Product.find({owner: req.session.user._id}).then((foundProducts)=>{
                console.log(foundProducts);
                res.render('create-product.hbs', { foundProducts })
            })
          console.log('New Product:', createdProduct);
          

        })
        .catch((err) => {
          console.log(err);
        });
    });
    
    router.get('/all-products', (req, res, next) => {
        Product.find()
        .then((products) => {
            res.render('all-products.hbs', { products });
        })
        .catch((err) => {
            console.log(err);
        });
    });
    
    module.exports = router;