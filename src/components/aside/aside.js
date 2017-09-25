var aside = require('./aside.html');
var $ = require('./../../js/jquery');
require('./aside.less');
$(function () {
    
    $('.aside').html(aside);
    switch (location.hash) {
        case '#/lysz':
            $('.content-left-lysz-a').addClass('content-left-active');
            lyszAJAX(1);
            break;
        case '#/kfzgl':
            $('.content-left-kfzgl-a').addClass('content-left-active');
            break;
        case '#/dzcj':
            $('.content-left-dzcj-a').addClass('content-left-active');
            break;
        case '#/tcdz':
            $('.content-left-tcdz-a').addClass('content-left-active');
            break;
        case '#/zygl':
            $('.content-left-zygl-a').addClass('content-left-active');
            break;
        case '#/sqfw':
            $('.content-left-sqfw-a').addClass('content-left-active');
            break;
        case '#/clgl':
            $('.content-left-clgl-a').addClass('content-left-active');
            break;
    };
    $('.content-left-a').on('click', function () {
        $('.content-left-a').removeClass('content-left-active');
        $(this).addClass('content-left-active');
    });

    $('.content-left-lysz-a').on('click', function () {
        lyszAJAX(1);
        // console.log(1);
    });



    $('.index_pagination').click(function () {
        lyszAJAX($('.index_pagination .active').attr('page'));
    });
});

function lyszAJAX(num) {
    var html = '';
    $.ajax({
        method: 'get',
        url: 'http://127.0.0.1:8084/v1/route.json',
        data: {
            page: num,
            size: '5'
        },
        success: function (res) {
            // console.log(res)
            var ln = res.data.length;
            for (var i = 0; i < ln; i++) {
                html +=
                    '<ul>' +
                    '<li><input type="checkbox" /></li>' +
                    '<li>' + res.data[i].path + '</li>' +
                    '<li>' + res.data[i].stripPrefix + '</li>' +
                    '<li>' + res.data[i].requestMethod + '</li>' +
                    '<li>' + res.data[i].id + '</li>' +
                    '<li>' + res.data[i].serviceId + '</li>' +
                    '<li>' + res.data[i].url + '</li>' +
                    '<li>' + res.data[i].enabled + '</li>' +
                    '<li>' +
                    '<span class="glyphicon glyphicon-pencil lysz_list_r"></span>' +
                    '<span class="glyphicon glyphicon-trash lysz_list_x"></span>' +
                    '</li>' +
                    '</ul>'
            };
            $('.lysz_list_ul').html(html);
            pageing(10); //页码总页数
            $('.pagination li').removeClass('active');

        }
    })
}

function pager(opt) {
    var set = $.extend({
        num: null,
        startnum: 1,
        elem: null,
        callback: null
    }, opt || {});
    if (set.startnum > set.num || set.startnum < 1) {
        set.startnum = 1;
    };
    var n = 0;
    var htm = '';
    var clickpages = {
        elem: set.elem,
        num: set.num,
        callback: set.callback,
        init: function () {
            this.elem.next('div.pageJump').children('.button').unbind('click');
            this.jumpPages();
            this.elem.children('li').click(function () {
                var txt = $(this).children('a').text();
                var page = '';
                var ele = null;
                var page1 = parseFloat(clickpages.elem.children('li.active').attr('page'));
                if (isNaN(parseFloat(txt))) {
                    switch (txt) {
                        case '下一页':
                            if (page1 === clickpages.num) {
                                return;
                            }
                            if (page1 >= (clickpages.num - 2) || clickpages.num <= 6 || page1 < 3) {
                                ele = clickpages.elem.children('li.active').next();
                            } else {
                                clickpages.newPages('next', page1 + 1);
                                ele = clickpages.elem.children('li.active');
                            }
                            break;
                        case '上一页':
                            if (page1 <= '1') {
                                return;
                            }
                            if (page1 >= (clickpages.num - 1) || page1 <= 3 || clickpages.num <= 6) {
                                ele = clickpages.elem.children('li.active').prev();
                            } else {
                                clickpages.newPages('prev', page1 - 1);
                                ele = clickpages.elem.children('li.active');
                            }
                            break;
                        case '«':
                            if (page1 === '1') {
                                return;
                            }
                            if (clickpages.num > 6) {
                                clickpages.newPages('«', 1);
                            }
                            ele = clickpages.elem.children('li[page=1]');
                            break;
                        case '»':
                            if (page1 === clickpages.num) {
                                return;
                            }
                            if (clickpages.num > 6) {
                                clickpages.newPages('»', clickpages.num);
                            }
                            ele = clickpages.elem.children('li[page=' + clickpages.num + ']');
                            break;
                        case '...':
                            return;
                    }
                } else {
                    if ((parseFloat(txt) >= (clickpages.num - 3) || parseFloat(txt) <= 3) && clickpages.num > 6) {
                        clickpages.newPages('jump', parseFloat(txt));
                    }
                    ele = $(this);
                };
                page = clickpages.actPages(ele);
                if (page !== '' && page !== page1) {
                    if (clickpages.callback) {
                        clickpages.callback(parseFloat(page));
                    };
                }
            });
        },
        actPages: function (ele) {
            ele.addClass('active').siblings().removeClass('active');
            return clickpages.elem.children('li.active').text();
        },
        jumpPages: function () {
            this.elem.next('div.pageJump').children('.button').click(function () {
                var i = parseFloat($(this).siblings('input').val());
                if (isNaN(i) || (i <= 0) || i > clickpages.num) {
                    return;
                } else if (clickpages.num > 6) {
                    clickpages.newPages('jump', i);
                } else {
                    var ele = clickpages.elem.children('li[page=' + i + ']');
                    clickpages.actPages(ele);
                    if (clickpages.callback) {
                        clickpages.callback(i);
                    };
                    return;
                };
                if (clickpages.callback) {
                    clickpages.callback(i);
                };
            });
        },
        newPages: function (type, i) {
            var html = '';
            var htmlLeft = '';
            var htmlRight = '';
            var htmlC = '';
            var HL = '<li><a href="#">...</a></li>';
            html = '<li><a href="#" aria-label="Previous">&laquo;</a></li>' +
                '<li><a href="#">上一页</a></li>';
            for (var n = 0; n < 3; n++) {
                htmlC += '<li ' + ((n - 1) === 0 ? 'class="active"' : '') + ' page="' +
                    (i + n - 1) + '"><a href="#">' + (i + n - 1) + '</a></li>';
                htmlLeft += '<li ' + ((n + 2) === i ? 'class="active"' : '') + ' page="' +
                    (n + 2) + '"><a href="#">' + (n + 2) + '</a></li>';
                htmlRight += '<li ' + ((set.num + n - 3) === i ? 'class="active"' : '') + ' page="' +
                    (set.num + n - 3) + '"><a href="#">' + (set.num + n - 3) + '</a></li>';
            };
            switch (type) {
                case 'next':
                    if (i <= 4) {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            htmlLeft + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    } else if (i >= (set.num - 3)) {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            HL + htmlRight + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    } else {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            HL + htmlC + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    };
                    break;
                case 'prev':
                    if (i <= 4) {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            htmlLeft + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    } else if (i >= (set.num - 3)) {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            HL + htmlRight + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    } else {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            HL + htmlC + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    };
                    break;
                case '«':
                    html += '<li class="active" page="1"><a href="#">1</a></li>' +
                        htmlLeft + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    break;
                case '»':
                    html += '<li page="1"><a href="#">1</a></li>' +
                        HL + htmlRight + '<li class="active" page="' +
                        set.num + '"><a href="#">' + set.num + '</a></li>';
                    break;
                case 'jump':
                    if (i <= 4) {
                        if (i === 1) {
                            html += '<li class="active" page="1"><a href="#">1</a></li>' +
                                htmlLeft + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                        } else {
                            html += '<li page="1"><a href="#">1</a></li>' + htmlLeft + HL +
                                '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                        };
                    } else if ((i >= set.num - 3) && (set.num >= 7)) {
                        if (i === set.num) {
                            html += '<li page="1"><a href="#">1</a></li>' +
                                HL + htmlRight + '<li class="active" page="' +
                                set.num + '"><a href="#">' + set.num + '</a></li>';
                        } else {
                            html += '<li page="1"><a href="#">1</a></li>' +
                                HL + htmlRight + '<li page="' +
                                set.num + '"><a href="#">' + set.num + '</a></li>';
                        };
                    } else {
                        html += '<li page="1"><a href="#">1</a></li>' +
                            HL + htmlC + HL + '<li page="' + set.num + '"><a href="#">' + set.num + '</a></li>';
                    };
            };
            html += '<li><a href="#">下一页</a></li>' +
                '<li><a href="#" aria-label="Next">&raquo;</a></li>';
            if (this.num > 5 || this.num < 3) {
                set.elem.html(html);
                clickpages.init({
                    num: set.num,
                    elem: set.elem,
                    callback: set.callback
                });
            };
        }
    };
    if (set.num <= 1) {
        $('.pagination').html('');
        return;
    } else if (parseFloat(set.num) <= 6) {
        n = parseFloat(set.num);
        var html = '<li><a href="#" aria-label="Previous">&laquo;</a></li>' +
            '<li><a href="#">上一页</a></li>';
        for (var i = 1; i <= n; i++) {
            if (i === set.startnum) {
                html += '<li class="active" page="' + i + '"><a href="#">' + i + '</a></li>';
            } else {
                html += '<li page="' + i + '"><a href="#">' + i + '</a></li>';
            }
        };
        html += '<li><a href="#">下一页</a></li>' +
            '<li><a href="#" aria-label="Next">&raquo;</a></li>';
        set.elem.html(html);
        clickpages.init();
    } else {
        clickpages.newPages('jump', set.startnum);
    };
}


function pageing(num) {
    pager({
        num: num,
        startnum: 1,
        elem: $('#page2'),
        callback: function (n) {
            $('.pageJump').show();
        }
    });
}