const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'please add name']
    },
    email:{
        type:String,
        required: [true,'please add email'],
        unique: true
    },
    role:{
        type:String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})

//encrypt password using bcrypt
UserSchema.pre('save', async function(nxt){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt
        );
});

//match user entered password with the hsh password
UserSchema.methods.matchPassword = async function(enteredpaddword){
    return await bcrypt.compare(enteredpaddword, this.password)
};

//sign JWT and return
UserSchema.methods.getSignedJWT = function(){
return jwt.sign({id: this.id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
});
};

module.exports = mongoose.model('User', UserSchema);

