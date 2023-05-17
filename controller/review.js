const mongoose = require('mongoose');
const Review = require('../models/Review');
const BootCamp = require('../models/Bootcamps');

exports.getReviews = async (req, res, nxt)=>{
    
    if(req.params.bootampId){
        const reviews = await Review.find({bootcamp: req.params.bootampId })
       return res.status(201).json({
            success: true, 
            data: reviews});
    }else{
        console.log('no reviews');
    }
   // console.log(req.body);
};

exports.addReview = async (req, res, nxt)=>{
    //add user
    req.body.bootamp = req.params.bootampId;
    req.body.user = req.params.userId;
    const bootamp = BootCamp.findById(req.params.bootampId);
    if (!bootamp)
    {
        console.log('bootcamp not exist');
    }
    const review = await Review.create(req.body);

     res.status(201).json({
            success: true, 
            data: review});
  
};

