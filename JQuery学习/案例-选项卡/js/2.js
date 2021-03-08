$(function($) {
    $('tabBox li').on('click', function() {
        console.log(this);
        $(this).addClass('active').siblings().removeClass('active').parent().nextAll().removeClass('active').eq($(this).index()).addClass('active');
    });
});