const jwt = require('jsonwebtoken');
const user = require('../models/User');
const User = require('../models/User');
//protect routes
exports.protect = async(req,res,nxt)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        console.log('not authorized to use this route');
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        nxt();
    }catch{
        console.log('not authorized to use this route');
    }
}