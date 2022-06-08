const LOGIN_HASH = '21232f297a57a5a743894a0e4a801fc3'; //admin
const PASSWORD_HASH = '202cb962ac59075b964b07152d234b70'; //123
const ACCESS_TOKEN = '68A50385C0B069C135BA499C70F49BC8';

checkoutAuth(localStorage.getItem('token'));

$('.auth__button').click(function (event) {
    event.preventDefault();

    let login = $('#login').val();
    let password = $('#password').val();

    if (login === '') {
        alert('Введите логин');
        return;
    }

    if (password === '') {
        alert('Введите пароль');
        return;
    }

    if (LOGIN_HASH !== $.md5(login)) {
        alert('Неверный логин или пароль');
        return;
    }

    if (PASSWORD_HASH !== $.md5(password)) {
        alert('Неверный логин или пароль');
        return;
    }

    localStorage.setItem('token', ACCESS_TOKEN);

    window.location = `${window.location.origin}/admin/orders.html`;
});

$('.logout__button').click(function (event) {
    event.preventDefault();

    localStorage.removeItem('token');

    window.location = `${window.location.origin}/admin/`;
});

function checkoutAuth(token) {
    if (window.location.pathname !== '/admin/') {
        if (token === null || token !== ACCESS_TOKEN ) {
            window.location = `${window.location.origin}/admin/`;
            localStorage.removeItem('token');
        }
    } else if (window.location.pathname === '/admin/') {
        if (token !== null || token === ACCESS_TOKEN) {
            window.location = `${window.location.origin}/admin/orders.html`;
        }
    }
}