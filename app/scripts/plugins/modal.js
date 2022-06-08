$(function() {
  $('.modal__form-input[id="phone"]').mask('+7 (000) 000-00-00');
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}  

$(document).on('click', '.fa-minus' , function() {
    let count = parseInt($(this).parent().attr('data-count'));
    let totalPriceBlock = $('.modal__total_price');
    
    let priceBlock = $(this).parent().parent().find('.modal__basket-item-price');
    
    let origPrice = parseInt(priceBlock.attr('data-orig-price'));
    let totalPrice = parseInt(priceBlock.attr('data-total-price'));

    let countView = $(this).parent().find('span');
    
    let newTotalPrice = parseInt(totalPriceBlock.attr('data-total')) - origPrice;
    
    if (count > 1) {
        $(this).parent().attr('data-count', --count);
        priceBlock.attr('data-total-price', totalPrice - origPrice);
        countView.text($(this).parent().attr('data-count'));
        priceBlock.text(priceBlock.attr('data-total-price'));
        totalPriceBlock.attr('data-total', newTotalPrice);
        totalPriceBlock.text(`${newTotalPrice}₽`);
    }
});

$(document).on('click', '.fa-plus' , function() {
    let count = parseInt($(this).parent().attr('data-count'));
    let totalPriceBlock = $('.modal__total_price');
    
    let priceBlock = $(this).parent().parent().find('.modal__basket-item-price');
    
    let origPrice = parseInt(priceBlock.attr('data-orig-price'));
    let totalPrice = parseInt(priceBlock.attr('data-total-price'));

    let countView = $(this).parent().find('span');
    
    let newTotalPrice = parseInt(totalPriceBlock.attr('data-total')) + origPrice;
    
    $(this).parent().attr('data-count', ++count);
    priceBlock.attr('data-total-price', totalPrice + origPrice);
    countView.text($(this).parent().attr('data-count'));
    priceBlock.text(priceBlock.attr('data-total-price'));
    totalPriceBlock.attr('data-total', newTotalPrice);
    totalPriceBlock.text(`${newTotalPrice}₽`);
});

$(document).on('click', '.basket__payment' , function() {

    $('.modal__basket').empty();
    $('.modal__total').empty();

    let basket = JSON.parse(localStorage.getItem('basket'));
    let items = getItems();

    items.then(response => {
        let total = 0;

        response.forEach(element => {
            if (basket.indexOf(parseInt(element.id)) != -1) {  
                $('.modal__basket').append(`
                    <span data-id="${element.id}" class="modal__basket-item">
                        ${element.name}
                        <div class="quantity" data-count="1">
                            <i class="fa-solid fa-minus"></i>
                            <span>1</span>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <span data-orig-price="${element.price}" data-total-price="${element.price}" class="modal__basket-item-price">${element.price}₽</span>
                    </span>
                `);
    
                total += parseInt(element.price);
            }
        });

        localStorage.setItem('total', total);

        $('.modal__total').append(`Итоговая стоимость: <span data-total="${total}" class="modal__basket-item-price modal__total_price">${total}₽</span>`);
    });


    $('.modal').show();
})

$(document).on('click', '.js-close' , function() {
    $('.modal').hide();
});

$(document).on('click', '.modal__form-button' , function(event) {
    event.preventDefault()
  
    let name = $('#name').val();
    let phone = $('#phone').val();
    let email = $('#email').val();
  
    if (name === '') {
        alert('Укажите Ваше имя');
        return;
    }

    if (phone === '') {
        alert('Укажите правильный номер телефона');
        return;
    }
  
    if (!validateEmail(email)) {
        alert('Укажите правильную почту');
        return
    }
    
    $.ajax({
        url: `${window.location.origin}/backend/php/set-order.php`,
        method: 'post',
        dataType: 'html',
        data: {
            name: name,
            phone: phone,
            email: email,
            items: getOrder(),
            total: parseInt($('.modal__total_price').attr('data-total'))
        },
        success: function(response, status) {
            if (status === 'success') {
                    alert('Заказ оформлен');
  
                    localStorage.setItem('basket', JSON.stringify([]));
                
                    window.location = `${window.location.origin}/index.html`;
            }
        },
        error: function (jqXHR, exception) {
            alert('Заказ не оформлен. Повторите попытку позже!');
            
            window.location = `${window.location.origin}/index.html`;
        },
    });
});

function getOrder() {
    let totalOrder = [];
    
    $(".modal__basket span").each(function (index, value) { 
        let order = {};
        
        let id = $(value).attr('data-id');
        
        if (typeof id !== 'undefined') {
            order.id = id;
        }
        
        let count = $(value).find('.quantity').attr('data-count');
        
        if (typeof count !== 'undefined') {
            order.count = count;
        }
        
        if (typeof count !== 'undefined' && typeof id !== 'undefined') {
            totalOrder.push(order);
        }
    });
    
    return totalOrder;
}