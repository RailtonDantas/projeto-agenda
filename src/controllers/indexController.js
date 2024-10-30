module.exports.renderEjsIndex = function(req,res,next){
    if(req.session.user !== undefined){
        res.redirect('/enter')
        return 
    }
    res.render('index')
    next()
}