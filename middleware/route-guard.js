const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    next();
  };
  
  const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/');
    }
    next();
  };

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