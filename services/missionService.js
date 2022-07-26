const Mission = require('../models/missionModel');

class MissionService {

  async index(){
    return await Mission.findAll()
  }

  //Refatorar
  async new(){
    return await Mission.findAll()
  }

  async create(new_mission){

    const { name, description, point, classroomId } = new_mission;

    //Validation
    let errors = [];

    if (!name || !description || !point || !classroomId ) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, name, description, point, classroomId}

        throw err;
      } else {
        
        const user = await Mission.create({
            name: new_mission.name,
            description: new_mission.description,
            point: new_mission.point,
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

    const { id, name, description, point, classroomId} = edit_mission;

    //Validation
    let errors = [];

    if (!name || !description || !point ) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }

    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, id, name, description, point}

        throw err;
      } else {
 
      const update_mission = await Mission.update({
        name: edit_mission.name,
        description: edit_mission.description,
        point: edit_mission.point,
      },{
        where: {
            id: id
        }})
    }  
    return Mission.findByPk(id);
  }

}

module.exports = MissionService;