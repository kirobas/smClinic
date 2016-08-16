var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	res.render('index', { title: 'smClinic', subTitle: 'Тестовое задание'});

});

module.exports = router;
