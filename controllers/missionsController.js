const Mission = require('../models/missionModel');
const MissionService = require("../services/missionService");
const passport = require('passport');


exports.index = async (req, res, next) => {
    try{
        const missions = await new MissionService().index();
        res.render("missions/index", {missions: missions});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    let classroomId = req.params.classroomId;   
    res.render("missions/new", {classroomId: classroomId});
};

exports.create = async(req, res, next) => {

    try{
        const mission = await new MissionService().create(req.body);
        req.flash(
            'success_msg','Missão cadastrada com sucesso!'
           );
        res.render("missions/show", {mission: mission});
    }catch(error){
        
        if (error.errors){
            res.render("missions/new", {name: error.errors['name'], 
            description: error.errors['description'], point: error.errors['point'], 
            errors: error.errors['errors'] });
        }
        else{
            res.render("missions/new");
        }       
    }
};

exports.show = async (req, res, next) => {
    try{
        const mission = await new MissionService().show(req.params.id);
        res.render("missions/show", {mission: mission} );
    }catch(error){
        res.redirect("/mission");
    }
};

exports.edit = async (req, res, next) => {
    try{
        const mission = await new MissionService().edit(parseInt(req.params.id));
        res.render("missions/edit", {mission: mission});
    }catch(error){
        res.redirect("/missions");
    }
};

exports.update = async(req, res, next) => {
    
    try{
        const mission = await new MissionService().update(req.body);
        res.render("missions/show", {id: mission.id, mission: mission});
    }catch(error){
        console.log(error);
        if (error.errors){
            res.render("missions/edit", {id: error.errors['id'], name: error.errors['name'], 
            description: error.errors['description'], point: error.errors['point'], errors: error.errors['errors'] });
        }
        else{
            res.redirect("/");
        }   
    }
};