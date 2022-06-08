render();

function render() {

    let items = getItems();

    $.ajax({
        url: `${window.location.origin}/backend/php/get-orders.php`,
        method: 'get',
        dataType: 'html',
        success: function(response) {
            let orders = [];

            if (typeof response === 'object') {
                orders = response;
            } else {
                orders = JSON.parse(response);
            }

            orders.forEach(order => {
                let itemsInOrder = JSON.parse(order.items);

                items.then(response => {
                    let itemsText = '';

                    response.forEach(item => {
                        let indexOf = itemsInOrder.findIndex(i => i.id === item.id);
                        
                        if (indexOf !== -1) {
                            itemsText += `<span>${item.name} в кол-во <b>${itemsInOrder[indexOf].count}</b>шт.</span><br>`;
                        }
                    });

                    $('.table').append(`
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.name}</td>
                            <td>${order.phone}</td>
                            <td>${order.email}</td>
                            <td>${itemsText}</td>
                            <td>${order.total}</td>
                        </tr>
                    `);
                });
            });
        }
    });
}

function getItems() {
    return $.ajax({
        url: `${window.location.origin}/backend/php/get-items.php`,
        method: 'get',
        dataType:"JSON",
        success: function(response) {
            if (typeof response === 'object') {
                return response;
            } else {
                return JSON.parse(response);
            }
        }
    });
}