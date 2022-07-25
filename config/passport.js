const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');// o import desta função será em usersController.js para POSTlogin e // logout, 'passport' vai ser passado a partir de app.js

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email,
      password, done) => {
       // e-mail coincide?
       User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){ // Se existe um usuário com esse e-mail
            // Validar senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct){
                return done(null, user);
            }else{
                return done(null, false, { message: 'Password incorrect'});
            }

        }else{
            res.redirect("/login");
        }
    });
        
    })
  );
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// metodo para desserialização do 'user'
passport.deserializeUser(function(id, done) {
    User.findOne({ where: { id: id } }).then((user) => {
        done(null, user);
      });
  });
  };