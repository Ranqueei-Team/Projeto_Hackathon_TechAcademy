const User = require('../models/userModel');
const UserService = require("../services/usersService");

exports.index = async (req, res, next) => {
    try{
        const users = await new UserService().index();
        res.render("users/index", {users: users});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    res.render("users/new");
};

exports.create = async(req, res, next) => {

    try{
        const user = await new UserService().create(req.body);
        console.log('verificando' +user)
        res.render('users/show', {user: user});
    }catch(error){
        res.render("users/new");
    }
};

exports.show = async (req, res, next) => {
    try{
        const user = await new UserService().show(req.params.id);
        res.render("users/show", {user: user});
    }catch(error){
        res.redirect("/");
    }
};

exports.edit = async (req, res, next) => {
    try{
        const user = await new UserService().edit(req.params.id);
        res.render("users/edit", {user: user});
    }catch(error){
        res.redirect("/");
    }
};

exports.update = async(req, res) => {
    try{
        const user = await new UserService().update(req.body);
        console.log("checando user" + user)
        res.render("users/show", {id: user.id, user: user});
    }catch(error){
        console.log(error)
        res.redirect("/");
    }
};