const Mission = require('../models/missionModel');

class MissionService {

  async index(){
    return await Mission.findAll()
  }

  async listMissionsByClassrooms(classroomId){
    return await Mission.findAll({where: {classroomId: classroomId}})
  }

  async create(new_mission){

    const { name, description, point, classroomId } = new_mission;

    //Validation
    let errors = [];

    if (!name || !point || !classroomId ) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, name, description, point, classroomId}
      throw err;

      } else {
        
        const mission = await Mission.create({
          name: name,
          description: description,
          point: point,
          classroomId: classroomId
        });
        return new_mission;
      }
    }

  async show(id){
    return await Mission.findByPk(id);
  }

  async edit(id){
    return await Mission.findByPk(id);
  }

  async update(edit_mission){

    const { id, name, description, point} = edit_mission;

    //Validation
    let errors = [];

    if (!name || !point ) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }

    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, id, name, description, point}
      throw err;

      } else {
 
      const update_mission = await Mission.update({
        name: name,
        description: description,
        point: point,
      },{
        where: {
            id: id
        }})
    }  
    return Mission.findByPk(id);
  }

}

module.exports = MissionService;