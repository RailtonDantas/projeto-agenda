require('dotenv').config()
const express = require("express");
const path = require('path');
const app = express();
const flash = require("connect-flash");
const { routes } = require("./routes");
const session = require('express-session');
const csrf = require('csurf');
const { checkError , giveCsrfToken} = require('./src/middlewares/middlewaresForCsrf');
// const helmet = require('helmet');
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose');
// const errors = require("./src/middlewares/middlewaresForCsrf").errors;
// const userExist = require('./src/middlewares/middlewaresForCsrf').userExist;
// const userNotExist = require('./src/middlewares/middlewaresForCsrf').userNotExist;
// const user = require('./src/middlewares/middlewaresForCsrf').user;
// const sucess = require("./src/middlewares/middlewaresForCsrf").sucess;
const saveInLocals = require('./src/middlewares/middlewaresForCsrf').saveInLocals;
app.use(
    express.urlencoded(
        {extended:true}
    )
);
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => 
    app.emit('A CONEXÃO OCORREU')
)
.catch(() => console.log('base de dados não conectada'))
const sessionOptions = session({
    secret:'2918y3wgrbewjhebfiewurw rg7832t g3ryeyFBE,W9    7WYRGEF',
    // store: new MongoStore({mongooseConnection:mongoose.connection}),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24,
        httpOnly:true
    },
    store:MongoStore.create({mongoUrl:process.env.CONNECTIONSTRING})
});
app.use(sessionOptions)
app.use(flash())
app.use(saveInLocals)
// app.use(errors)
// app.use(userExist)
// app.use(userNotExist)
// app.use(user)
// app.use(sucess)
app.use(csrf())
// app.use(helmet())
app.use(express.static(path.resolve(__dirname,'public')))
app.set('views',path.resolve(__dirname,'src','views'));
app.set('view engine','ejs')
app.use(checkError);
app.use(giveCsrfToken)
app.use(routes)
app.on('A CONEXÃO OCORREU', () => {
    app.listen(3000)
    console.log('http://localhost:3000')
})