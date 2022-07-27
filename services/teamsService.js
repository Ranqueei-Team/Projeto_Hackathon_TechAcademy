const Team = require('../models/teamModel');

class TeamService {

    async index(){
        return await Team.findAll()
    }

    async listTeamsByClassrooms(classroomId){
        return await Team.findAll({where: {classroomId: classroomId}})
    }

    async create(new_team){

        const { name, classroomId } = new_team;

        //Validation
        let errors = [];

        if (!name || !classroomId ) {
            errors.push({ msg: 'Por favor, preencha os campos obrigatórios!' });
        }
   
        if (errors.length > 0) {
        
            let err = new Error("Ocorreu um erro!");
            err.errors = {errors, name, classroomId}
            throw err;

        }else {
            
            const team = await Team.create({
                name: name,
                classroomId: classroomId
            });
            return team;
        }
    }

    async show(id){
      return await Team.findByPk(id);
    }


    async edit(id){
        return await Team.findByPk(id);
    }

    async update(edit_team){

        const { id, name, classroomId} = edit_team;

        //Validation
        let errors = [];

        if (!name ) {
            errors.push({ msg: 'Por favor, preencha o nome da Equipe!' });
        }

        if (errors.length > 0) {
        
            let err = new Error("Ocorreu um erro!");
            err.errors = {errors, id, name, classroomId}
            throw err;
        }else {
    
            const update_team = await Team.update({
                name: name
        },{
            where: {
                id: id
            }});
        }  
        return Team.findByPk(id)
    }

}

module.exports = TeamService;