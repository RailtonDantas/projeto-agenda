const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const schema = new mongoose.Schema({
    userEmail:{type:String,required:true},
    userPassword:{type:String,required:true}
});
const logins = mongoose.model('logins',schema);
module.exports.modelLogins = logins;

class registerUsers{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
        this.userExist = false;
    }

   async register(){
        // this.valida()
        // if(this.errors.length > 0){
        //    return
        // }
        // await this.verifyIfUserExist()
        const salt = bcryptjs.genSaltSync();


        this.body.userPassword = bcryptjs.hashSync(this.body.userPassword,salt)
        try{
            this.user = await logins.create(this.body);
        }
        catch(e){
            console.log(e)
        }
    }


    async verifyIfUserExist(){
       const exist = await logins.findOne({userEmail:this.body.userEmail});
       if(exist ==  null) return
       const emailExist = Boolean(exist.userEmail);
       if(emailExist) this.userExist = true;
       
    }

    valida(){
        // validar email e senha
        this.cleanUp()
        if(!validator.isEmail(this.body.userEmail)){
            this.errors.push("E-mail inválido!")
        }
        const lengthPassword = this.body.userPassword.length
        if(lengthPassword < 3 || lengthPassword > 50){
            this.errors.push("A senha deve ter entre 3 e 50 caracteres!")
        }

    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] != 'string'){
                this.body[key] = ''
            }
        };
        this.body = {
            userEmail: this.body.userEmail,
            userPassword: this.body.userPassword
        };
    }
}

module.exports.registerUser = registerUsers;



































// class registerUserMy{
//     constructor(email,password){
//         this.email = email;
//         this.password = password;

//     }
//     addUserInDb(){
//         logins.create({
//             email:this.email,
//             password:this.password
//         }).then(() => console.log('dados enviados'))
//         .catch(() => console.log("deu ruim"))
//     }
// }
// module.exports.registerUser = registerUserMy;