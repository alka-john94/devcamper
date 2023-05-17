const mongoose = require('mongoose');
const BootCampSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        re: 'User',
        require: true
    }
});

module.exports = mongoose.model('BootCamp', BootCampSchema);