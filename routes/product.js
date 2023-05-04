var express = require('express');
var router = express.Router();

const Product = require('../models/Product.model');

const { isLoggedIn, isAdmin } = require('../middleware/route-guard')

//Create Product
router.get('/create-product', isAdmin, (req, res, next) => {
    Product.find({owner: req.session.user._id}).then((foundProducts)=>{
        console.log(foundProducts);
        res.render('create-product.hbs', { foundProducts })
    }).catch((err) => {
        console.log(err);
})

});


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

//Read
    router.get('/all-products', (req, res, next) => {
        Product.find()
        .then((products) => {
            res.render('all-products.hbs', { products });
        })
        .catch((err) => {
            console.log(err);
        });
    });
    

//Delete button
    router.post("/delete/:id", (req, res, next) => {
        Product.findByIdAndDelete(req.params.id)
          .then((result) => {
            console.log("Deleted:", result);
            res.redirect("/product/create-product");
          })
          .catch((err) => {
            console.log(err);
          });
      });


//Reviews
router.get('/product-details/:id', (req, res, next) => {
    
  Product.findById(req.params.id)
      .populate('owner')
      .populate({path: "reviews", 
          populate: {path: "user"}})
      .then((foundProducts) => {
          res.render('product-details.hbs', foundProducts)
      })
      .catch((err) => {
          console.log(err)
      })

})

//Update edit 
router.get("/product-details/:id", (req, res, next) => {
    Product.findById(req.params.id)
      .then((product) => {
        res.render("product-details.hbs", { product });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });
  
  // POST route Edit product
router.post("/edit-product/:id", (req, res, next) => {
    const { name, description, price, imageUrl } = req.body;
    Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      imageUrl,
    })
      .then(() => {
        res.redirect(`/product/product-details/${req.params.id}`);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });
  

    module.exports = router;