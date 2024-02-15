const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const auth=req.headers["authorization"]
    try{
		const token=auth.split(" ")[1];
        const data=jwt.verify(token, process.env.SECRET)
        req.userId=data.userId
        next();
    }catch(e){
        res.send({error: "Not Authorized"})
    }
}

module.exports = {authMiddleware}