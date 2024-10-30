const modelLogins = require("./registerUser").modelLogins;
const bcryptjs = require("bcryptjs");

class verifyUserExistInDB{
    constructor(body){
        this.body = body;
        this.enterErrors = []
    }

    async returnUser(){
        return await modelLogins.findOne({userEmail:this.body.userEmail})
    }

   async verifyEmailInDataBase(){
        const user = await this.returnUser();
        if(user == null){
            this.enterErrors.push('Email inválido!')
        }
    }

    async verifyPassword(){
        const user = await this.returnUser();
        if(user == null){
            this.enterErrors.push("Senha inválida");
            return
        }
        const comparePasswords = bcryptjs.compareSync(this.body.userPassword,user.userPassword)
        if(!comparePasswords) this.enterErrors.push('Senha inválida!')
        
    }
}

module.exports.verifyUserExistInDB = verifyUserExistInDB;