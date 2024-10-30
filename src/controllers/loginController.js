const { electron } = require('webpack');

const register = require('../models/registerUser').registerUser;
const sucess = require("../middlewares/middlewaresForCsrf").sucess;
const verifyUserExistInDB = require('../models/verifyUserInDB').verifyUserExistInDB;
const addContactsInDB = require("../models/registerContactsOfUsers").addContactsInDB;

module.exports.loginIndexControler = (req,res,next) => {
    res.render('loginIndex')
    res.locals.contacts = []
    next()
}
module.exports.registerInDb = async (req,res,next) => {
    try{
        const registerUser = new register(req.body)
        // await registerUser.verifyIfUserExist()
        // await registerUser.register()
        registerUser.valida()
        if(registerUser.errors.length > 0){
            req.flash('errors',  registerUser.errors);
            req.session.save(function(){
                return res.redirect('/login')
            });
            return
        }
        await registerUser.verifyIfUserExist()
        if(registerUser.userExist){
            req.flash('userExist','Você já possui uma conta, acesse ela!')
            req.session.save(function(){
                return res.redirect('/login')
            });
            return
        }
        // req.flash('sucess','sua conta foi criada com sucesso!');
        // res.locals.sucess = req.flash('sucess');
        await registerUser.register()
        next()
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}
module.exports.renderRegister = (req,res,next) => {
    res.render('register')
    next()
}
module.exports.loginApproved = async (req,res,next) => {
    try{
        const verifyUserExist = new verifyUserExistInDB(req.body);
        await verifyUserExist.verifyEmailInDataBase();
        await verifyUserExist.verifyPassword();
    
        if(verifyUserExist.enterErrors.length > 0){
            req.flash('userNotExist',verifyUserExist.enterErrors);
            req.session.save(function(){
                return res.redirect("/login");
            })
            return
        }
        req.session.user = await verifyUserExist.returnUser()
        req.session.save()
        res.locals.user = req.session.user
        const contacts = await addContactsInDB.getAllContacts(req.session.user);
        res.locals.contacts = contacts;
        res.render('afterLogin');
        next()
    }catch(e){
        console.log(e)
    }
    
}
