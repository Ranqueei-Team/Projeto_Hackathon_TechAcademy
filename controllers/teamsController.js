const Team = require('../models/teamModel');
const TeamService = require("../services/teamsService");

exports.index = async (req, res, next) => {
    try{
        const teams = await new TeamService().index();
        res.render("teams/index", {teams: teams});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    let classroomId = req.params.classroomId;   
    res.render("teams/new", {classroomId: classroomId});
};

exports.create = async(req, res, next) => {

    try{
        const team = await new TeamService().create(req.body);
        req.flash(
            'success_msg','Equipe cadastrada com sucesso!'
           );
        res.render("teams/show", {team: team});
    }catch(error){
        
        if (error.errors){
            res.render("teams/new", {name: error.errors['name'], 
            classroomId: error.errors['classroomId'], 
            errors: error.errors['errors'] });
        }
        else{
            res.render("teams/new");
        }       
    }
};

exports.show = async (req, res, next) => {
    try{
        const team = await new TeamService().show(req.params.id);
        res.render("teams/show", {team: team} );
    }catch(error){
        res.redirect("/team");
    }
};

exports.edit = async (req, res, next) => {
    try{
        const team = await new TeamService().edit(parseInt(req.params.id));
        res.render("teams/edit", {team: team});
    }catch(error){
        res.redirect("/teams");
    }
};

exports.update = async(req, res, next) => {
    
    try{
        const team = await new TeamService().update(req.body);
        res.render("teams/show", {id: team.id, team: team});
    }catch(error){
        console.log(error);
        if (error.errors){
            res.render("teams/edit", {id: error.errors['id'],
            name: error.errors['name'], errors: error.errors['errors'] });
        }
        else{
            res.redirect("/");
        }   
    }
};