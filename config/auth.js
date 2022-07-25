module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'É necessário logar no sistema para acessar essa área.');
      res.redirect('/users/login');
    }
  };