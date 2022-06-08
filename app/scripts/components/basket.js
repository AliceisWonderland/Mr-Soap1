let basket = [];

if (localStorage.getItem('basket') === null) {
    localStorage.setItem('basket', JSON.stringify([]));
} else {
    basket = JSON.parse(localStorage.getItem('basket'));

    $('.header__basket').attr('data-basket', basket.length);
}

render();

function render() {
    let items = getItems();

    items.then(response => {
        response.forEach(element => {
            if (basket.indexOf(parseInt(element.id)) != -1) {  
                $('.basket__items').append(`
                <div class="basket__item">
                    <img src="${element.image}" alt="Мыло">
                    <div class="basket__item-info">
                        <span class="text">${element.name}</span>
                        <span class="text">${element.price}₽</span>
                    </div>
                    <button id="${element.id}" class="btn__basket basket__button">Удалить</button>
                </div>
            `);
            }
        });
    });
    
    checkingAvailabilityButton();
}

$(document).on('click', '.basket__button', function() {
    let id = parseInt($(this).attr('id'));

    basket = basket.filter((item) => {
        return item !== id
    });

    localStorage.setItem('basket', JSON.stringify(basket));

    $(this).parent().remove();

    updateHeader();
    checkingAvailabilityButton();
})

function updateHeader() {
    $('.header__basket').attr('data-basket', basket.length);
}

function checkingAvailabilityButton() {
    if (basket.length > 0) {
        $('.basket__payment').show();
        $('.basket__purchases').hide();
    } else {
        $('.basket__payment').hide();
        $('.basket__purchases').show();
    }
}