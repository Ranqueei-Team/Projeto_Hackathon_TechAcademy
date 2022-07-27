const Reward = require('../models/rewardModel');

class RewardService {

  async index(){
    return await Reward.findAll()
  }

  async listRewardsByClassrooms(classroomId){
    return await Reward.findAll({where: {classroomId: classroomId}})
  }

  async create(new_reward){

    const { name, rating, classroomId } = new_reward;

    //Validation
    let errors = [];

    if (!name || !rating || !classroomId ) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }
   
    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, name, rating, classroomId}
      throw err;
    } else {
        
        const reward = await Reward.create({
          name: name,
          rating: rating,
          classroomId: classroomId
        });
      return reward;
    }
  }

  async show(id){
    return await Reward.findByPk(id);
  }


  async edit(id){
    return await Reward.findByPk(id);
  }

  async update(edit_reward){

    const { id, name, rating, classroomId} = edit_reward;

    //Validation
    let errors = [];

    if (!name || !rating ) {
      errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
    }

    if (errors.length > 0) {
      
      let err = new Error("Ocorreu um erro!");
      err.errors = {errors, id, name, rating, classroomId}
      throw err;

      } else {

      const update_reward = await Reward.update({
        name: name,
        rating: rating,
      },{
        where: {
            id: id
        }})
    }  
    return Reward.findByPk(id);
  }

}

module.exports = RewardService;