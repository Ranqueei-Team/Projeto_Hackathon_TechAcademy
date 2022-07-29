const Classroom = require('../models/classroomModel');
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const Sequelize = require("sequelize");
const sequelize = require("../database/database")

class ClassroomService {

  async create(new_classroom){

    const { name, description } = new_classroom;

    //Validation
    let errors = [];

    if (!name) {
      errors.push({ msg: 'Por favor, preencha o nome da turma!' });
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, name, description}
      throw err;
      
    } else {
        
        const classroom = await Classroom.create({
            name: new_classroom.name,
            description: new_classroom.description
         
        });
        return classroom;
    }
  }

  async show(id){
    return await Classroom.findByPk(id);
  }


  async edit(id){
    return await Classroom.findByPk(id);
  }

  async update(edit_classrooom){

    const { id, name, description, active} = edit_classrooom;

    //Validation
    let errors = [];

    if (!name) {
      errors.push({ msg: 'Por favor, preencha o nome da turma!' });
    }

    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, id, name, description}
      throw err;

      } else {
 
        const update_classroom = await Classroom.update({
          name: edit_classrooom.name,
          description: edit_classrooom.description,
          active: edit_classrooom.active,
        },{
        where: {
            id: id
        }})
        return await Classroom.findByPk(id);
      }  
    }

  async findByUser(userId){

    const { QueryTypes } = require('sequelize');
    const classrroms = await sequelize.query("SELECT * FROM profiles, classrooms where profiles.classroomId = classrooms.id and profiles.userId = ?",{
      replacements: [userId],
      type: QueryTypes.SELECT,
    },); 
    
    return classrroms
  }
}
module.exports = ClassroomService;