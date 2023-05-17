const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const BootCamp = require('./models/Bootcamps');
const User = require('./models/User');

mongoose.connect('mongodb+srv://abcduser:abcd123@cluster0.gqpnee5.mongodb.net/devcamper?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    //read files
    const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamp.json`,'utf-8'))
    //read users
    const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`,'utf-8'))
    //import into db
    const importData = async () =>{
        try{
            await BootCamp.create(bootcamps);
            await User.create(users);
            console.log('data imported---');
            process.exit();
        }catch(error){
            console.error(error);error
        }
    }
if (process.argv[2]=='-i'){
    importData();
}