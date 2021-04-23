(function(){

	const app_el = document.querySelector('#app');
	const products_list = app_el.querySelector('.products-list');
	const cart_list = app_el.querySelector('.cart-list');

    let product_items = app_el.querySelectorAll('.product-section');
    let cart_items = app_el.querySelectorAll('.cart-section');
	let renderProducts = makeRender('#products-template');
	let renderCartProducts = makeRender('#cart-template');
	let products = [];
	let promise_arr = [];

	let cart_products = JSON.parse(localStorage.getItem('cartList')) || [];

	function makeRender(selector) {
	    let template = document.querySelector(selector).innerHTML;		
	    return new Function('data', 'index', 'return `' + template + '`');
	}

	function show_products(){
		cart_products.forEach((cart_element) => {
			let current_product = products.find(item => item.id == cart_element.id);
			if (current_product.available == cart_element.quantity){
				current_product.disabled = true;
			} else {
				current_product.disabled = false;
			}
		});

		let data_html = products.map(function(value, index){
	    	return renderProducts(value, index);
	    }).join('');
	    products_list.innerHTML = data_html;
	    product_items = app_el.querySelectorAll('.product-section');
	}

	function show_cart(){
		if (cart_products.length == 0) {
			cart_list.innerHTML = "<p>The cart is empty</p>";
		} else {
			let total_price = 0;
			let data_html = cart_products.map(function(value, index){
		    	return renderCartProducts(value, index);
		    }).join('');
		    cart_products.forEach(function(element){
		    	total_price += element.quantity * element.price;
		    });
		    data_html += '<p><strong>Total price: </strong>' + total_price + '</p>';
		    cart_list.innerHTML = data_html;
		}
		cart_items = app_el.querySelectorAll('.cart-section');
	}

	function saveData() {
        localStorage.setItem('cartList', JSON.stringify(cart_products));
    }

	let productsPromise = new Promise(function(resolve, reject) {	    
	    fetch('http://my-json-server.typicode.com/achubirka/db/products', {
		  method: 'GET',
		  headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		  }
		}).then((response) => response.json()).then((data) => {			
		  	resolve(data);
		});
	});

	promise_arr.push(productsPromise);

	Promise.all(promise_arr).then(function(data) {
	    products = data[0];
	    products.forEach(function(element){
	    	element.disabled = (element.available == 0) ? true : false;
	    });

	    show_products();
	    show_cart();
	});

	function check_disabled_status(product, cart){
		if (product - cart == 0) {
			return true;
		} else {
			return false;
		}
	}

	function add_to_cart(index){
		if (cart_products.find(item => item.id == products[index].id) == undefined) {
			let new_product = {
				id: products[index].id,
				name: products[index].name,
				price: products[index].price,
				quantity: 1,
				disabled: check_disabled_status(products[index].available, 1)
			};
			products[index].disabled = new_product.disabled;
			cart_products.push(new_product);
		} else {
			cart_products.forEach(function(element){
				if (element.id == products[index].id && products[index].available - element.quantity > 0){
					element.quantity = element.quantity * 1 + 1;
					element.disabled = check_disabled_status(products[index].available, element.quantity);
					products[index].disabled = element.disabled;
				}
			});
		}
		saveData();
		show_cart();
	    show_products();
	}

    function add_one(index){
    	let current_product = products.find(item => item.id == cart_products[index].id);
    	if (current_product.available - cart_products[index].quantity > 0){
    		cart_products[index].quantity = cart_products[index].quantity * 1 + 1;
			cart_products[index].disabled = check_disabled_status(current_product.available, cart_products[index].quantity);
			current_product.disabled = cart_products[index].disabled;
    	}
    	saveData();
		show_cart();
	    show_products();
    }

    function remove_one(index){
    	let current_product = products.find(item => item.id == cart_products[index].id);
    	if (cart_products[index].quantity > 1){
    		cart_products[index].quantity = cart_products[index].quantity * 1 - 1;
    		cart_products[index].disabled = false;
    		current_product.disabled = false;
    	} else {
    		cart_products.splice(index, 1);
    	}
    	saveData();
		show_cart();
	    show_products();
    }

	products_list.addEventListener('click', function(event) {
        let target = event.target;
        let product_item = target.closest('.product-section');
        let index = -1;
        switch(target.dataset.action) {
            case 'add':
                index = Array.prototype.indexOf.call(product_items, product_item);
                add_to_cart(index);
                break;
            default:
                break;
        }
    });

    cart_list.addEventListener('click', function(event) {
        let target = event.target;
        let cart_item = target.closest('.cart-section');
        let index = -1;
        switch(target.dataset.action) {
            case 'add_one':
                index = Array.prototype.indexOf.call(cart_items, cart_item);
                add_one(index);
                break;
            case 'remove_one':
                index = Array.prototype.indexOf.call(cart_items, cart_item);
                remove_one(index);
                break;
            default:
                break;
        }
    });

    window.addEventListener('storage', (event) => {    
	    if (event.key === 'cartList') {
	        cart_products = JSON.parse(event.newValue);
			show_cart();
		    show_products();
	    }
	});

})();