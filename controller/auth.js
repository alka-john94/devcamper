const User = require('../models/User');

//create user
exports.register = async(req,res,nxt)=>{
 // const user = await res.status(200).json({success: true});
const {name, email, password, role} = req.body;
const user =await User.create({
    name,
    email,
    password,
    role
});

//create token
sendTokenResponse(user, 200, res);

};

//login user
exports.login = async(req,res,nxt)=>{
    // const user = await res.status(200).json({success: true});
   const {email, password} = req.body;
   if(!email || !password){
        console.log('please provide an email and password');
   }
   
   const user = await User.findOne({email}).select('+password')
   if (!user){
        console.log('invalid email');
   }

   const isMatch = await user.matchPassword(password);

   if(!isMatch){
        console.log('invalid password');
   }
   
   //create token
   sendTokenResponse(user, 200, res);
   
   };

   //logout user
   exports.logout = async(req,res,nxt)=>{
    res.cookie('token','none',{expires: new Date(Date.now()+10*1000),httpOnly:true});
    
    res.status(200).json({success: true, data: {}});
   };

   //get token from model, create cookie and send
   const sendTokenResponse = (user, statusCode, res)=>{
    const token = user.getSignedJWT();
    const options = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        token
    });

   };