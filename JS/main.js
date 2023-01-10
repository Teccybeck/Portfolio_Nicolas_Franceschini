$(document).ready(function() {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200 ) { 
            $('#remonter').css('right','5%');
        } else { 
            $('#remonter').removeAttr( 'style' );
        }
    });
})