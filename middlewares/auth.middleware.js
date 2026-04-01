const jwt = require("jsonwebtoken");


function authMiddleware(req, res, next){
    console.log("Authentication ....");
    try{
    // Authorization Header
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({ error : "Unauthorized kindly provide Authorization Header"});
    }
    const token = authHeader.split(" ")[1]; //Baarer token
    if(!token) {
        return res
        .status(401)
        .json({ error: "Unauthorized kindly provide token in Authorization Header"});
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(500).json({ error : err.message });
  }
} 

const generateToken = async (user) => {
    const payload = {
        id : user._id,
        email : user.email,
        role : user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
    return token;
    
};


module.exports = {authMiddleware, generateToken};