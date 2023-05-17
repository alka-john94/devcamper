
const express = require('express');
const {getBootCamps, createBootCamps} = require('../controller/bootcamp')
const router = express.Router();
const {protect} = require('../middleware/auth');

router
.route('/')
.get(getBootCamps)
.post(protect, createBootCamps);

module.exports = router;
