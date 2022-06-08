render();

function render() {
    $.ajax({
        url: `${window.location.origin}/backend/php/get-items.php`,
        method: 'get',
        dataType: 'html',
        success: function(response) {
            let items = [];

            if (typeof response === 'object') {
                items = response;
            } else {
                items = JSON.parse(response);
            }

            items.forEach(item => {
                $('.table').append(`
                    <tr>
                        <td><img src="${item.image}" alt="${item.name}"></td>
                        <td>${item.name}</td>
                        <td>${item.price}₽</td>
                        <td><button id="${item.id}" class="item__remove">Удалить</button></td>
                    </tr>
                `);
            });
        }
    });
}

$(document).on('click', '.item__remove', function(event) {
    event.preventDefault();

    let id = parseInt($(this).attr('id'));

    $.ajax({
        url: `${window.location.origin}/backend/php/remove-item.php`,
        method: 'post',
        dataType: 'html',
        data: {
            item_id: id
        },
        success: function(response, status) {
            if (status === 'success') {
                alert('Товар удалён');
                location.reload();
            }
        }
    });
})