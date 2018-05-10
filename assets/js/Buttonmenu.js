$(document).ready(function(){
    $('.btn-menu').click(function() {
        $('.btn-menu').toggleClass('mm-opening');
        $('.container--menu').slideToggle('fast');
    })
});