var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function (req, res) {
   res.render('todo');
});

router.post('/todo', function (req, res) {

});

router.delete('/todo', function (req, res) {

});

module.exports = router;
