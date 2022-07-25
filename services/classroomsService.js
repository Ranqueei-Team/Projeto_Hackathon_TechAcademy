const Classroom = require('../models/classroomModel');

class ClassroomService {

  async index(){
    return await Classroom.findAll()
  }

  //Refatorar
  async new(){
    return await Classroom.findAll()
  }

  async create(new_classroom){

    const { name, description } = new_classroom;

    //Validation
    let errors = [];

    if (!name) {
      errors.push({ msg: 'Por favor, preencha o nome da turma!' });
      console.log(errors)
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, name, description}

        throw err;
      } else {
        
        const user = await Classroom.create({
            name: new_classroom.name,
            description: new_classroom.description
         
        });
      return new_classroom;
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
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }

    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, id, name, description}

        throw err;
      } else {
 
      const update_classroom = await Classroom.update({
        name: edit_classrooom.name,
        description: edit_classrooom.email,
        active: edit_classrooom.active,
      },{
        where: {
            id: id
        }})
    }  
    return Classroom.findByPk(id);
  }



  }

  

  module.exports = ClassroomService;