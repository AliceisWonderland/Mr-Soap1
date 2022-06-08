if (localStorage.getItem('basket') !== null) {
    basket = JSON.parse(localStorage.getItem('basket'));

    $('.header__basket').attr('data-basket', basket.length);
}