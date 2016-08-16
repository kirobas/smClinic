var config = require('config');
var mysql = require('mysql');

var connection = mysql.createConnection(config.get('Customer.dbConfig'));

connection.connect(function(err) {
	if (err) throw err;
	console.log('You are now connected...')
});

module.exports = connection;