var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Blisee Studio" });
});

module.exports = router;



// const Product = require('../models/Product.model');
// const twilio = require('twilio');

// // Twilio 
// const accountSid = 'AC06d3e2bcbdb53f5b394ae2de2723652d';
// const authToken = '437b3a7237cca7279ae79b6aaeb57b10';
// const client = twilio(accountSid, authToken);

// // Route to handle sending messages via Twilio
// router.get('/home', async (req, res, next) => {
//   try {
//     // Extract recipient and message from query parameters
//     const { recipient, message } = req.query;

//     // Create and send message using Twilio API
//     await client.messages.create({
//       body: message,
//       from: '+18443109510',
//       to: recipient
//     });

//     // Render success message
//     res.status(200).send('Message sent successfully!');
//   } catch (err) {
//     // Handle errors
//     next(err);
//   }
// });


