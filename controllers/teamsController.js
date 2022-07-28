const Team = require('../models/teamModel');
const TeamService = require("../services/teamsService");
const UserService = require("../services/usersService");

exports.listTeamsByClassrooms = async (req, res, next) => {
    try{
        const teams = await new TeamService().listTeamsByClassrooms(req.user.current_classroom);
        res.render("teams/index", {teams: teams});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    let classroomId = req.user.current_classroom;   
    res.render("teams/new", {classroomId: classroomId});
};

exports.create = async(req, res, next) => {
    try{
        const team = await new TeamService().create(req.body, req.user.current_classroom);
        req.flash(
            'success_msg','Equipe cadastrada com sucesso!'
        );
        res.redirect("/teams");
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
        req.flash(
            'success_msg','Equipe atualizada com sucesso!'
        );
        res.redirect("/teams");
    }catch(error){
        if (error.errors){
            res.render("teams/edit", {id: error.errors['id'],
            name: error.errors['name'], errors: error.errors['errors'] });
        }
        else{
            res.redirect("/teams");
        }   
    }
};

exports.studentByTeam = async(req, res, next) => {
    res.render("teams/studentByTeam");
};

exports.searchStudentByEmail = async(req, res, next) => {
    try{
        const student = await new TeamService().searchStudentByEmail(req.body.email);
        res.render("teams/studentByTeam", {student: student});
    }catch(error){
        res.redirect("/");
    }
};

exports.addStudentByTeam = async(req, res, next) => {
    try{
        const profile = await new UserService().createProfile(req.user.current_classroom, req.params.studentId, "Student");
        const students = await new UserService().findUsersByTeam(req.user.current_classroom);
        res.render("teams/listStudentsByTeam", {students: students});
    }catch(error){
        res.redirect("/");
    }
};

exports.listStudentsByTeam = async(req, res, next) => {
    try{
        const students = await new UserService().findUsersByTeam(req.user.current_classroom);
        res.render("teams/listStudentsByTeam", {students: students});
    }catch(error){
        res.redirect("/");
    }
};

