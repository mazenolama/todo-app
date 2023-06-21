const jwt  = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if(!token) return res.status(401).json({result:'Unauthorized',message:"You are not authenticated!"}).end()
    try {
        jwt.verify(token, process.env.PRIVATE_KEY)
        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({result:'Unauthorized', message: error.message}).end()
        } else {
            return res.status(400).json({result:'Unauthorized', message: "Invalid token"}).end()
        }
    }
}

module.exports = {verifyToken}