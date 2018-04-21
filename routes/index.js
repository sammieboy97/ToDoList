var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo');

var MyModel = mongoose.model('list', new mongoose.Schema({ item: String }));
/*var itemOne = MyModel({item: 'buy Pokeballs'}).save(function (err) {
    if(err) throw err;
    console.log('Item saved');
});*/

var data = [{item: 'Feed my dog'}, {item: 'Kick some ass'}, {item: 'Drink Water'}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function (req, res) {
    MyModel.find({}, function (err, data) {
        res.render('todo', {
            todos : data
        });
    });
});

router.post('/todo', urlEncodedParser, function (req, res) {
    var temp = MyModel(req.body).save(function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});

router.delete('/todo/:item', function (req, res) {
    MyModel.find({item: req.params.item.replace(/\-/, " ")}).remove(function (err, data) {
       if(err) throw err;
       res.json(data);
    });
    /*
    data = data.filter(function (todo) {
       return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);*/
});

module.exports = router;
