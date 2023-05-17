const mongoose = require('mongoose');

const connectDB = async() => {
    const conn = await mongoose.connect('mongodb+srv://abcduser:abcd123@cluster0.gqpnee5.mongodb.net/devcamper?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    console.log(`Mongo DB connected ${conn.connection.host}`.blue.bold);
};

module.exports = connectDB;