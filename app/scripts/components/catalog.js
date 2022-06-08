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

            let button = `<button id="${element.id}" class="btn__basket catalog__button">В корзину</button>`;
    
            if (basket.indexOf(parseInt(element.id)) != -1) {  
                button = `<button id="${element.id}" class="btn__basket catalog__button in-basket">В корзине</button>`;
            }
    
            $('.catalog__items').append(`
                <div class="catalog__item">
                    <img src="${element.image}" alt="Мыло">
                    <div class="catalog__item-info">
                        <span class="text">${element.name}</span>
                        <span class="text">${element.price}₽</span>
                    </div>
                    ${button}
                </div>
            `);
        });
    })
}

$(document).on('click', '.catalog__button', function() {
    let id = parseInt($(this).attr('id'));

    if ($(this).hasClass('in-basket')) {
        removeItemFromBasket(id);

        $(this).removeClass('in-basket');
        $(this).text('В корзину');
    } else {
        addItemToBasket(id);

        $(this).addClass('in-basket');
        $(this).text('В корзине');
    }
})


function removeItemFromBasket(id) {
    basket = basket.filter((item) => {
        return item !== id
    });

    localStorage.setItem('basket', JSON.stringify(basket));

    updateHeader();
}

function addItemToBasket(id) {
    basket.push(id);

    localStorage.setItem('basket', JSON.stringify(basket));

    updateHeader();
}

function updateHeader() {
    $('.header__basket').attr('data-basket', basket.length);
}

