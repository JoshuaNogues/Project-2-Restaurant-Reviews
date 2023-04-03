var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  res.render('index', { title: 'revate', session: req.session });
});


module.exports = router;
