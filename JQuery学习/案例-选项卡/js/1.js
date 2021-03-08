$(function($) {
    $('.tabBox li').on('click', function() {
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active').parent().nextAll().removeClass('active').eq(index).addClass('active');
    });
});