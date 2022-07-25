module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      // msg erro
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }
  };