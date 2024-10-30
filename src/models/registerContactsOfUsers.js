const validator = require('validator');
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userConnected:{required:true,type:String},
    name:{required:true,type:String},
    surname:{type:String},
    email:{type:String},
    phoneNumber:{type:String}
})
const contactModel = mongoose.model('contatos',schema);
class addContactsInDB{
    constructor(user,newContact){
        this.user = user;
        this.newContact = newContact;
        this.errors = []
    }
    
    async addContactsInUser(){
        const newContact = this.prepareContact()
        await contactModel.create(newContact)
        
    }
    
    prepareContact(){
        return {
            userConnected:this.user.userEmail,
            name:this.newContact.registerName,
            surname:this.newContact.registerSurname,
            email:this.newContact.registerEmail,
            phoneNumber:this.newContact.registerPhoneNumber
        }
    }
    
    validDates(){
        if(validator.isEmpty(this.newContact.registerEmail) && validator.isEmpty(this.newContact.registerPhoneNumber)){
            this.errors.push('É necessário ao menos um contato: Email ou número de telefone')
          return
        }

        if(!validator.isEmail(this.newContact.registerEmail) && !validator.isEmpty(this.newContact.registerEmail)){
          this.errors.push('Email inválido!');
          return
        }
        
        if(validator.isEmpty(this.newContact.registerName)){
            this.errors.push('É necessário um nome!')
            return
        }
    }
    
    static async getAllContacts(user){
        const allContacts = await contactModel.find({userConnected:user.userEmail})
        return allContacts
    }
    
    
}

module.exports.addContactsInDB = addContactsInDB;
module.exports.contactModel = contactModel;