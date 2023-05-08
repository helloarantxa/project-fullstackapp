// If user is logged in by checking if a user property exists 
// on the req.session object. If the user property does not exist, 
// the user is redirected to the login page. Otherwise, next() is 
// called to pass control to the next middleware function in the chain.

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    next();
  };
  
  // if a user is logged out by checking if the user property exists on the 
  // req.session object. If the user property exists, the user is redirected 
  // to the home page. Otherwise, next() is called to pass control to the 
  // next middleware function in the chain.

const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/home');
    }
    next();
  };

  // if a user is an admin by checking if the user property exists on the 
  // req.session object and if the isAdmin property on the user object is true. 
  // If the user property does not exist or if the isAdmin property is false, 
  // the user is redirected to the all-products page. 

  const isAdmin = (req, res, next) => {
    if(!req.session.user || req.session.user.isAdmin === false){
      return res.redirect('/product/all-products')
    }
    next();
  };
  


  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
  };