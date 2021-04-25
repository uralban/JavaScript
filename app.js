$(document).ready(function() {
	const $app = $('#app');
	const $list = $('.commentsList');

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/comments',
        method: 'GET',
        data: {
            userId: 3,
            postId: 15
        }
    }).done(function(data) {

        let data_html = data.map(function(value){
        	return `<li>${value.name}</li>`;
        }).join('');

        $list.html(data_html);
    });

});
