const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const registerController = async(req, res)=>{
    console.log("Received");
    const {email, name, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    try{
        const registerQuery = await pool.query("INSERT INTO users (email, name, hashed_password) VALUES ($1, $2, $3);",[email, name, hashedPassword]); 
        const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '1hr'});
        console.log(registerQuery);
        return res.json({
            name,
            email,
            token
        });
    }catch(e){
        console.log(e);
        return res.status(404).json(e);
    }
};

module.exports = registerController;