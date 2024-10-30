const contactModel = require('../models/registerContactsOfUsers').contactModel;
const loginModel = require('../models/registerUser').modelLogins;
const bcryptjs = require('bcryptjs');
const { modelLogins } = require('../models/registerUser');
module.exports.deleteContact = async (req,res,next) => {
    const id = req.params.id;
    await contactModel.findByIdAndDelete({_id:id})
    res.redirect("/enter")
}

module.exports.deleteAccount = async (req,res,next) => {
    const user = await modelLogins.findOne({userEmail:req.body.userEmail});
    const verifyPassword = bcryptjs.compareSync(req.body.userPassword,user.userPassword);
    if(!verifyPassword){
        req.flash("wrongPassword",'Senha incorreta')
        res.redirect('/enter')
       return
    }
    await contactModel.deleteMany({userConnected:req.body.userEmail});
    await loginModel.deleteOne({userEmail:req.body.userEmail})
    req.session.destroy()
    res.redirect('/')
}