const express = require('express');
const routes = express.Router()
const controlersIndex = require('./src/controllers/indexController');
const controllersLogin = require("./src/controllers/loginController");
const controllersContact = require('./src/controllers/contactsControllers');
const logoutControllers = require('./src/controllers/logoutControllers');
const registerContactControllers = require("./src/controllers/contactsControllers");
const updateContactControllers = require("./src/controllers/updateContacts");
const deleteContactControllers = require('./src/controllers/deleteControllers');

routes.get("/",controlersIndex.renderEjsIndex);
const contactsModel = require("./src/models/registerContactsOfUsers").contactModel;

// rotas de login
routes.get("/login",controllersLogin.loginIndexControler)
routes.post('/registerUser',controllersLogin.registerInDb,controllersLogin.renderRegister)
routes.post('/enter', controllersLogin.loginApproved)
routes.get('/enter',function(req,res,next){
    res.render('afterLogin');
})
routes.get("/registrarContato",controllersContact.renderRegisterRoute)
routes.post('/contatoRegistrado',registerContactControllers.addContacts,registerContactControllers.redirect)
routes.get("/logout", logoutControllers.logout)

routes.get('/edit/:id/',updateContactControllers.getContact)
routes.post('/edit/:id/',updateContactControllers.updateContact)

routes.get('/delete/:id',deleteContactControllers.deleteContact)
routes.post("/delete/deleteAccount",deleteContactControllers.deleteAccount)
module.exports.routes = routes;

