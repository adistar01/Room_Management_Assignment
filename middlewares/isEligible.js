const pool = require("../config/db");

const isEligible = async(req, res, next)=>{
    const { email } = req.body;
    try{
        const users = await pool.query("SELECT * FROM users WHERE email = $1;",[email]);
        // console.log(users);
        if(!users.rows || users.rows.length==0){
            return res.status(400).json({
                "error": "User not found!"
            })
        }
        if(users.rows[0].canManage==0){
            return res.status(400).json({
                "error": "Not authorised!"
            })
        }
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}

module.exports = isEligible;