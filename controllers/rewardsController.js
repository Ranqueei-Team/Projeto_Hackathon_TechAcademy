const Reward = require('../models/rewardModel');
const RewardService = require("../services/rewardsService");

exports.index = async (req, res, next) => {
    try{
        const rewards = await new RewardService().index();
        res.render("rewards/index", {rewards: rewards});
    }catch(error){
        res.redirect("/");
    }
};

exports.new = async (req, res, next) => {
    let classroomId = req.params.classroomId;   
    res.render("rewards/new", {classroomId: classroomId});
};

exports.create = async(req, res, next) => {

    try{
        const reward = await new RewardService().create(req.body);
        req.flash(
            'success_msg','Recompensa cadastrada com sucesso!'
           );
        res.render("rewards/show", {reward: reward});
    }catch(error){
        if (error.errors){
            res.render("rewards/new", {name: error.errors['name'], 
            rating: error.errors['rating'], 
            classroomId: error.errors['classroomId'], 
            errors: error.errors['errors'] });
        }
        else{
            res.render("rewards/new");
        }       
    }
};

exports.show = async (req, res, next) => {
    try{
        const reward = await new RewardService().show(req.params.id);
        res.render("rewards/show", {reward: reward} );
    }catch(error){
        res.redirect("/rewards");
    }
};

exports.edit = async (req, res, next) => {
    try{
        const reward = await new RewardService().edit(parseInt(req.params.id));
        res.render("rewards/edit", {reward: reward});
    }catch(error){
        res.redirect("/rewards");
    }
};

exports.update = async(req, res, next) => {
    
    try{
        const reward = await new RewardService().update(req.body);
        res.render("rewards/show", {id: reward.id, reward: reward});
    }catch(error){
        if (error.errors){
            res.render("rewards/edit", {id: error.errors['id'], 
                name: error.errors['name'], 
                rating: error.errors['rating'], 
                errors: error.errors['errors'] });
        }
        else{
            res.redirect("/rewards");
        }   
    }
};