module.exports.renderRegisterRoute = (req,res,next) => {
    res.render('registerContact',{currentContact:[]})
    next()
}
module.exports.addContacts = async (req,res,next) => {
    try{
        const addContactsInDB = require('../models/registerContactsOfUsers').addContactsInDB;
        const newContact = new addContactsInDB(req.session.user,req.body)
        newContact.validDates()
        if(newContact.errors.length > 0){
            req.flash('invalidContact',newContact.errors);
            // res.locals.invalidContact = req.flash("invalidContact");
            req.session.save(function(){
                res.redirect("/registrarContato")
            })
            return
        }
    
        await newContact.addContactsInUser()
        next()
    }catch(e){
        console.log(e)
    }
}
module.exports.redirect = (req,res,next) => {
    res.redirect('/enter')
}