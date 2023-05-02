var express = require('express');
var router = express.Router();
var Product = require('../models/Product.model');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('index', { title: 'Bliss Studio', products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
