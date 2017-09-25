var header = require('./header.html');
var $ = require('./../../js/jquery');
require('./header.less');
$(function () {
    $('.header').html(header);
    $('.header_out').click(function () {
        localStorage.removeItem('login');
        $('.body').hide();
        $('.login').show();
    });
    $('.content-top-right-mingcheng').html(localStorage.getItem('login'));
});