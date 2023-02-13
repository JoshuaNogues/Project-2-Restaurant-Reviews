var express = require('express');
var router = express.Router();

router.get('/add-restaurant', (req, res, next) => {
    res.render('restaurants/add-restaurant.hbs');
  });
  
module.exports = router;