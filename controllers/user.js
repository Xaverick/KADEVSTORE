const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

seceret = "psvjoismvoifepd"



module.exports.register = async (req, res) => {
    const {email,username,password} = req.body;
    try{
        const userDoc = await User.create({
            email,
            username,
            password: bcrypt.hashSync(password, saltRounds)});
            res.json(userDoc)
    }catch(e){
        res.status(400).json(e);
    }
    

}


module.exports.login = async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const passok = bcrypt.compareSync(password, user.password)
        const username = user.username;
        if(passok){
            jwt.sign({username, id:user._id}, seceret, {}, (err,token) => {
                if (err) throw err;
                
                res.cookie('token',token).json({
                    id:user._id,
                    username: user.username
                });
            });
        }else{
            res.status(400).json('wrong credentials')
        }
    }
    else{
        res.status(400).json('wrong credentials')
    }
} 

module.exports.userdetail = (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, seceret, {}, (err,info) => {
        if (err) throw err
        res.json(info)
    })
}


module.exports.logout = (req,res) => {
    res.cookie('token', '').json('ok')
}