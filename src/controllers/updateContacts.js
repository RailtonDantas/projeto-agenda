const contactModel = require('../models/registerContactsOfUsers').contactModel;
const validator = require("validator");
module.exports.getContact = async (req,res,next) => {
    const id = req.params.id;
    const currentContact = await contactModel.findById({_id:id});
    res.render('registerContact',{currentContact})
    next()
}
module.exports.updateContact = async (req,res,next) => {
    const id = req.params.id
    const errors = [];
    function validDates(){
        const body = req.body;
        if(validator.isEmpty(body.updateEmail) && validator.isEmpty(body.updatePhoneNumber)){
            errors.push('É necessário ao menos um contato: Email ou número de telefone')
          return
        }

        if(!validator.isEmail(body.updateEmail) && !validator.isEmpty(body.updateEmail)){
          errors.push('Email inválido!');
          return
        }
        
        if(validator.isEmpty(body.updateName)){
            errors.push('É necessário um nome!')
            return
        }
    }

    validDates()
    if(errors.length > 0){
        req.flash('invalidContact',errors);
        // res.locals.invalidContact = req.flash("invalidContact");
        req.session.save(function(){
            res.redirect(`/edit/${id}`)
        })
        return
    }

    await contactModel.findByIdAndUpdate({_id:id},{
        name:req.body.updateName,
        surname:req.body.updateSurname,
        email:req.body.updateEmail,
        phoneNumber:req.body.updatePhoneNumber
    })
    res.redirect('/enter')
}