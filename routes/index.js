var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var data = [{item: 'Feed my dog'}, {item: 'Kick some ass'}, {item: 'Drink Water'}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function (req, res) {
   res.render('todo', {
       todos : data
   });
});

router.post('/todo', urlEncodedParser, function (req, res) {
    data.push(req.body);
    res.json(data);
});

router.delete('/todo/:item', function (req, res) {
    data = data.filter(function (todo) {
       return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});

module.exports = router;
