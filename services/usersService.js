const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

class UserService {

  async index(){
    return await User.findAll()
  }

  async new(){
    return await User.findAll()
  }

  async create(new_user){

    let salt = bcrypt.genSaltSync(10);
    let password_hash = bcrypt.hashSync(new_user.password, salt);
    const user = await User.create({
        name: new_user.name,
        cpf: new_user.cpf,
        email: new_user.email,
        password: password_hash
    });
    return user;
  }

  async show(id){
    return await User.findByPk(id);
  }

  async edit(id){
    return await User.findByPk(id);
  }

  async update(edit_user){
 
    let salt = bcrypt.genSaltSync(10);
    let password_hash = bcrypt.hashSync(edit_user.password, salt);
    console.log("verificando id " + edit_user.id);
    const user_updated = await User.update({
      name: edit_user.name,
      cpf: edit_user.cpf,
      email: edit_user.email,
      password: password_hash,
      active: true},{
      where: {
          id: edit_user.id
      }})
    return User.findByPk(edit_user.id);
  }


};

module.exports = UserService;