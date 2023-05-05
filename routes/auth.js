var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((passwordHash) => {
      return User.create({
        username,
        email,
        passwordHash,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(error);
      }
    });
});

router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
 console.log(email);

    User.findOne({ email })
        .then(user => {
          console.log(user);
            if (!user) {
                res.render('auth/login', { errorMessage: 'Incorrect email or password.' });
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)) {
              console.log(req.session)

                req.session.user = user
                console.log('User:', user)
                res.redirect('/home')
               
            } else {
                res.render('auth/login', { errorMessage: 'Incorrect email or password.' });
            }
        })
        .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/home');
    })
});
    
module.exports = router;