const jwt = require('jsonwebtoken');

const isLogin = async (req, res, next)=>{
    const authToken = req.headers.authorization;
    try{
        const decoded = await jwt.verify(authToken, process.env.SECRET_KEY);
        const mail = decoded.email;
        next();
    }catch(e){
        return res.status(404).json({
            "error": e
        });
    }
};

module.exports = isLogin;