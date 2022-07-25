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

    const { name, email, cpf, password, confirm_password} = new_user;
    let errors = [];

    if (!name || !email || !cpf || !password || !confirm_password) {
      errors.push({ msg: 'Por favor, preenchar todos os campos!' });
      console.log(errors)
    }


    if (password != confirm_password) {
      errors.push({ msg: 'As senhas informadas são diferentes!' });
      console.log(errors)
    }  
    if (password.length <= 7) {
      errors.push({ msg: 'A senha deve ter pelo menos 8 caracteres!' });
      console.log(errors)
    }
   
    console.log(errors.length)
    if (errors.length > 0) {
      // render da página com os valores do 'form' + erros
    
      let err = new Error("Ocorreu um errro");
      err.errors = {errors, name, cpf, email}

      throw err;
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password_hash = bcrypt.hashSync(password, salt);
      const user = await User.create({
          name: new_user.name,
          cpf: new_user.cpf,
          email: new_user.email,
          password: password_hash,
          confirm_password: password_hash
      });
      return user;
    }
   
    
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
      confirm_password: password_hash,
      active: true},{
      where: {
          id: edit_user.id
      }})
    return User.findByPk(edit_user.id);
  }


};

module.exports = UserService;