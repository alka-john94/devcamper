
const express = require('express');
const {getReviews, addReview} = require('../controller/review');
const Review = require('../models/Review');
const router = express.Router({mergeParams: true});
const advancedResult = require('../middleware/advancedResult');
const {protect} = require('../middleware/auth');

router
.route('/')
.get(getReviews)
.post(protect, addReview)

//router.route('/').get(
  //  advancedResult(Review,
    //{
      //  path: 'bootcamps',
        //select: 'name description'
    //}),
    //getReviews
//);

module.exports = router;
