const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const dotenv = require('dotenv');

dotenv.config();

const loginController = async(req, res)=>{
    const {email, password} = req.body;
    if(!email){
        return res.json({
            "error": "Enter your email"
        })
    }
    if(!password){
        return res.json({
            "error": "Enter your password"
        })
    }
    try{
        const loginUser = await pool.query("SELECT * FROM users WHERE email = $1;",[email]);
        // console.log(loginUser);
        if(loginUser.rows.length==0){
            return res.status(404).json({
                "error": "User not found!"
            })
        }
        const verifyPassword = await bcrypt.compare(password, loginUser.rows[0].hashed_password);
        if(!verifyPassword){
            return res.status(404).json({
                "error": "Enter correct password!"
            })
        }
        const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn:"1hr"});
        
        return res.json({
            email,
            "name": loginUser.name,
            token
        });
    }catch(e){
        return res.status(500).json(e);
    }
};

module.exports = loginController;