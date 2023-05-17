const Bootcamps = require("../models/Bootcamps");
const Reviews = require("../models/Review");

const advancedResult = (model, populate) => async(req, res, nxt) =>{

    let query;
    const reqQuery = {...req.query};

    const removeFields = ['select','sort','page','limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);


    //finding resource
    query = model.find(JSON.parse(queryStr));

    //select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if(populate){
        query = query.populate(populate);
    }

   const results = await query;
   res.advancedResult={
    success: true,
    count: results.length,
    data: results
   }
   if(!results){
    console.log('no data');
   }

}
module.exports = advancedResult;