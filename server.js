const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const cookieparser = require('cookie-parser');
const mongoosesanitize = require('mongoose-sanitize');

connectDB();

//route files
const bootcamps=require('./routes/bootcamp');
const auth = require('./routes/auth');
const reviews = require('./routes/review');

//load env var
dotenv.config({path: './config/config.env'});
const app = express();
//body parser
app.use(express.json());

//cookieparser
app.use.cookieparser;

app.use.mongoosesanitize;

//mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews',reviews);

const PORT = process.env.PORT||5000;
const server = app.listen(PORT, console.log(`server running on env ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.bold));
process.on('unhandledRejection',(error,promise)=>{
    console.log(`Error: ${error.message}`);
    server.close(()=> process.exit(1));
});