var express = require('express');
var router = express.Router();
var Product = require('../models/Product.model');

//twilio
// const bodyParser = require('body-parser');
// const twilio = require('twilio');

// const accountSid = 'AC06d3e2bcbdb53f5b394ae2de2723652d';
// const authToken = '437b3a7237cca7279ae79b6aaeb57b10';
// const client = twilio(accountSid, authToken);

// router.use(bodyParser.json());

// router.post('/send-message', (req, res) => {
//   const { message, recipient } = req.body;
//   client.messages
//     .create({
//       body: message,
//       from: '+18443109510',
//       to: recipient
//     })
//     .then(message => res.json({ success: true, message: 'Message sent successfully.' }))
//     .catch(err => res.json({ success: false, message: err.message }));
// });


/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('index', { title: 'Blisee Studio', products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
