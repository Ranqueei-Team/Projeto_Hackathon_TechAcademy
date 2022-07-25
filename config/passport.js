const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');// o import desta função será em usersController.js para POSTlogin e // logout, 'passport' vai ser passado a partir de app.js

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email,
      password, done) => {
     
       User.findOne({where:{email: email}}).then(user => {
       
            if (!user) {
             
                return done(null, false, { message: 'E-mail não cadastrado' });
            }

            let correct = bcrypt.compareSync(password,user.password);

            if(correct){
                return done(null, user);
            }else{
                return done(null, false, { message: 'Senha incorreta!'});
            }})
        })
    )

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