const Classroom = require('../models/classroomModel');
const ClassroomService = require("../services/classroomsService");
const passport = require('passport');


exports.index = async (req, res, next) => {
    try{
        const classrooms = await new ClassroomService().index();
        res.render("classrooms/index", {classrooms: classrooms});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    res.render("classrooms/new");
};

exports.create = async(req, res, next) => {

    try{
        const classroom = await new ClassroomService().create(req.body);
        req.flash(
            'success_msg','Turma cadastrada com sucesso!'
           );
        res.render("classrooms/show", {classroom: classroom});
    }catch(error){
        
        if (error.errors){
            res.render("classrooms/new", {name: error.errors['name'], description: error.errors['description'], errors: error.errors['errors'] });
        }
        else{
            res.render("classrooms/new");
        }       
    }
};

exports.show = async (req, res, next) => {
    try{
        const classroom = await new ClassroomService().show(req.params.id);
        res.render("classrooms/show", {classroom: classroom} );
    }catch(error){
        res.redirect("/classrooms");
    }
};

exports.edit = async (req, res, next) => {
    try{
        const classroom = await new ClassroomService().edit(parseInt(req.params.id));
        res.render("classrooms/edit", {classroom: classroom});
    }catch(error){
        res.redirect("/classrooms");
    }
};

exports.update = async(req, res, next) => {
    
    try{
        const classroom = await new ClassroomService().update(req.body);
        res.render("classrooms/show", {id: classroom.id, classroom: classroom});
    }catch(error){
        console.log(error);
        if (error.errors){
            console.log(error.errors['id']);
            res.render("classrooms/edit", {id: error.errors['id'], name: error.errors['name'], 
            description: error.errors['description'], errors: error.errors['errors'] });
        }
        else{
            res.redirect("/");
        }   
    }
};