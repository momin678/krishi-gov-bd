/*==================================================================================
    Custom JS (Any custom js code you want to apply should be defined here).
====================================================================================*/


$('.categories button').click(function(){
    if($('.filters_wrapper').css('display')=='block'){
        $('.filters_wrapper').slideToggle("slow");
        $(".categories .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
    }

    else if($('.filters_wrapper').css('display')=='none'){
        $('.filters_wrapper').slideToggle("slow");
        $(".categories .fa").removeClass("fa-angle-down").addClass("fa-angle-up");
    }
});