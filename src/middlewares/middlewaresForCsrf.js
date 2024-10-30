module.exports.checkError = (err,req,res,next) => {
    if(err){
       console.log(err)
       return res.render('404')
    }
    next()
}
const addContactsInDB = require('../models/registerContactsOfUsers').addContactsInDB;
module.exports.saveInLocals = async (req,res,next) => {
    res.locals.errors = req.flash('errors');
    res.locals.userExist = req.flash('userExist');
    res.locals.userNotExist = req.flash("userNotExist");
    res.locals.invalidContact = req.flash("invalidContact");
    res.locals.wrongPassword = req.flash('wrongPassword');
    res.locals.user = req.session.user;
    if(req.session.user !== undefined){
        const contacts = await addContactsInDB.getAllContacts(req.session.user);
        res.locals.contacts = contacts;
    }
    next();
}

module.exports.giveCsrfToken = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}

// module.exports.errors = (req,res,next) => {
//     res.locals.errors = req.flash('errors');
//     next()
// };
// module.exports.userExist = (req,res,next) => {
//     res.locals.userExist = req.flash('userExist');
//     next();
// }
// module.exports.userNotExist = (req,res,next) => {
//     res.locals.userNotExist = req.flash("userNotExist");
//     next()
// }
// module.exports.user = (req,res,next) => {
//     res.locals.user = req.session.user;
//     next()
// }