
var $ = require('./../js/jquery');

$(function () {
    if (localStorage.getItem('login')) {
        $('.body').show();
        $('.login').hide();
    };
    $('.login_skip').click(function () {
        if ($('.form_control').eq(0).val() === '') {
            alert('请输入用户名');
        } else if ($('.form_control').eq(1).val() === '') {
            alert('请输入密码');
        } else {
            localStorage.setItem('login',$('.form_control').eq(0).val());
            $('.body').show();
            $('.login').hide();
            location.reload();
        }    
    });
    $('.login_reset').click(function () {
        $('.form_control').val('');
    });
});


