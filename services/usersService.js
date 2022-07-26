const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const sequelize = require("../database/database")
const UserTeam = require('../models/userTeamModel');

class UserService {

  //Return all users
  async findUserById(id){
    return await User.findOne({where: {id: id}})
  }

  //Return all users
  async findUsersByTeam(teamId){
    console.log("aqui" +teamId)
    const { QueryTypes } = require('sequelize');
    const students = await sequelize.query("SELECT * FROM users, users_teams, teams where teams.id = users_teams.teamId and users.id = users_teams.userId and teams.id = ?",{
      replacements: [teamId],
      type: QueryTypes.SELECT,
    },);
    return students
  }

  //Create user
  async create(new_user){

    const { name, email, password, confirm_password} = new_user;

    //Validation
    let errors = [];

    if (!name || !email ||!password || !confirm_password) {
      errors.push({ msg: 'Por favor, preencha todos os campos!' });
    }

    if (password != confirm_password) {
      errors.push({ msg: 'As senhas informadas são diferentes!' });
    }  
    if (password.length <= 7) {
      errors.push({ msg: 'A senha deve ter pelo menos 8 caracteres!' });
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, name, email}

        throw err;
      } else {

        //Password crpytt
        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(password, salt);
     
        const user = await User.create({
            name: new_user.name,
            email: new_user.email,
            password: password_hash,
            confirm_password: password_hash
        });
      return user;
    }
  }

  //Show user data
  async show(id){
    return await User.findByPk(id);
  }

  //Form user edit
  async edit(id){
    return await User.findByPk(id);
  }

  //Updade user
  async update(edit_user){

    const { id, name, email, password, confirm_password} = edit_user;

    //Validation
    let errors = [];

    if (!name || !email) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }

    if (password != confirm_password) {
      errors.push({ msg: 'As senhas informadas são diferentes!' });
    }  
    if (password && password.length <= 7) {
      errors.push({ msg: 'A senha deve ter pelo menos 8 caracteres!' });
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, id, name, email, password}

        throw err;
      } else {
 
      //Password crpytt
      let salt = bcrypt.genSaltSync(10);
      let password_hash = bcrypt.hashSync(edit_user.password, salt);

      const user_updated = await User.update({
        name: edit_user.name,
        email: edit_user.email,
        password: password_hash,
        confirm_password: password_hash
      },{
        where: {
            id: id
        }})
    }  
    return User.findByPk(id);
  }

  async createProfile(classroomId, userId, type){
    const profile = await Profile.create({
      classroomId: classroomId,
      userId: userId,
      type: type
    });
    return profile;
  }

  async createUserTeam(teamId, userId){
    const user_team = await UserTeam.create({
      teamId: teamId,
      userId: userId
    });
    return user_team;
  }

  async currentClass(userId, classroomId){
    const currentclassroom = await User.update({
      current_classroom: classroomId},
      { where: { id: userId } }
    )
    return currentclassroom;
  }
  
};

module.exports = UserService;