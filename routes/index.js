const express = require('express');
var router = express.Router();


const LangController = require('../controllers/LangController');
router.get('/changeLang/:lang', LangController.changeLang);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});


module.exports = router;
