
const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 100
    },
    text:{
        type: String,
        required: true,
        maxlength: 500
    },
    rating:{
        type: Number,
        require: true,
        min: 1,
        max: 10
    },
    user:{
        type:mongoose.Schema.ObjectId,
        re: 'User',
        require: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);