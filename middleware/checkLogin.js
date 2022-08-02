const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) =>{
    const { authorization } = req.headers;

    try{
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = decoded;
        req._id = _id;
        next();
    }
    catch(err){
        res.status(500).json("authenticate error!")
    }
}

module.exports = checkLogin;