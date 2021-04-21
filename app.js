(function(){

	let app_el = document.getElementById('app');
	let users_list_el = app_el.querySelector('.js_users_list');

	function makeRender(selector) {
	    let template = document.getElementById(selector).innerHTML;		
	    return new Function('data', 'return `' + template + '`');
	}

	let renderUser = makeRender('users_list_template');

	fetch('https://jsonplaceholder.typicode.com/users', {
	  method: 'GET',
	  headers: {
	    'Content-type': 'application/json; charset=UTF-8',
	  }
	}).then((response) => response.json()).then((data) => {

	  	let data_html = data.map(function(value) {
            return renderUser(value);
        }).join("");

        users_list_el.innerHTML = data_html;

	})

})();