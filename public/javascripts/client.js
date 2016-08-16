setInterval(function () {
	jQuery.ajax({
		'type': 'POST',
		'url': '/ajaxservice/get',
		// 'data': {'from': 101, 'to': 102, 'message': 'blabla..'},
		// 'data': [{ name: 'Peter', data: 'bla-bla'} , { name: 'Vasiliy', data: 'ps...'}],
		'cache': false,
		'success': function (data) {
			if (data) {
				// render(mess); // необходимо реализовать
				// console.log(data);
				// res.render('index', {mess: JSON.stringify(data)});
				var data1 = JSON.parse(data);
				data1.forEach(function(element, index, array) {
					var par = document.createElement('p');
					var str = "";
					for (key in element) {
						str += '<strong>' + key + ': </strong>' + element[key] + ' ';
					}
					par.innerHTML = str;
					$('#container').append( par );
				})
				// element.innerHTML = JSON.stringify(data);
				// $('#container').append( document.createTextNode( JSON.stringify(data) ) );
			}
		}})
}, 4000);