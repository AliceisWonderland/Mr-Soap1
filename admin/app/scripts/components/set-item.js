const ALLOWS_IMAGES_TYPE = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

$('.items__add-button').click(function (event) {
    event.preventDefault();

    let name = $('#name').val();
    let price = $('#price').val();
    let file = $('#file').prop('files');
    let data = new FormData();

    if (name === '') {
        alert('Укажите название товара');
        return;
    }

    data.append('name', name);

    if (price === '') {
        alert('Укажите цену товара');
        return;
    }

    data.append('price', price);

    if (file.length === 0) {
        alert('Загрузите изображения товара');
        return;
    }

    if (ALLOWS_IMAGES_TYPE.indexOf(file[0].type) === -1) {  
        alert('Не правильное расширение картинки. Разрешенные: jpeg, jpg, png и webp');
        return;
    }

    data.append('file', file[0]);

    $.ajax({
		url: `${window.location.origin}/backend/php/set-item.php`,
		type: 'POST',
		data: data,
		cache : false,
		dataType: 'json',
		processData: false,
		contentType: false, 
		success: function(responce, status) {
            if (status === 'success') {
                alert('Товар добавлен');
                location.reload();
            }
		}
	});
});