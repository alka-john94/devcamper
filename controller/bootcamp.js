const { set } = require('mongoose');
const BootCamps = require('../models/Bootcamps')

exports.getBootCamps = async (req, res, next)=>{
    const bootCamps = await BootCamps.find();

    res.status(200).json({success: 'true', data: bootCamps});
}

exports.createBootCamps = async (req, res, nxt)=>{
    //add user
    req.body.user = req.user.id;
    const publishedBootcamp = await BootCamps.findOne({user:req.user.id })
    const bootCamp = await BootCamps.create(req.body);
   // console.log(req.body);
    res.status(201).json({
        success: 'true', 
        data: bootCamp});
};