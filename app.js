(function(){

	let app_el = document.getElementById('app');
	let users_list_el = app_el.querySelector('.js_users_list');

	fetch('https://jsonplaceholder.typicode.com/users', {
	  method: 'GET',
	  headers: {
	    'Content-type': 'application/json; charset=UTF-8',
	  }
	}).then((response) => response.json()).then((data) => {

	  	let data_html = data.map(function(value) {
            return `
                <div class="js_user_item row">
                    <div class="c5 js_item_text"><strong>Name: </strong>${value.name} <strong>Phone: </strong>${value.phone}</div>
                </div>`;
        }).join("");

        users_list_el.innerHTML = data_html;

	})

})();