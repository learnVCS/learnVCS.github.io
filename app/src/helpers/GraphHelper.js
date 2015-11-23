$(document).ready(function(){
	/* Toggle the mobile navigation menu */
    $(".navigation__icon").click(function(e){
        $(".navigation__list").toggleClass("navigation__list_active");
        $(".navigation__icon").toggleClass("navigation__icon_active");
    });
    $(document).click(function (event) {
     if(!$(event.target).hasClass("navigation__icon")) {
         console.log("not navigation list");
         $(".navigation__list").removeClass("navigation__list_active");
         $(".navigation__icon").removeClass("navigation__icon_active");
     }
    });

    /* automatic scrolling for navigation */
    $("#menuWhy").click(function(e){
         $('html,body').animate({
            scrollTop: $(".why").offset().top},
        'slow');
    });
    $("#menuLearn").click(function(e){
         $('html,body').animate({
            scrollTop: $(".learn").offset().top},
        'slow');
    });
    $("#menuMore").click(function(e){
         $('html,body').animate({
            scrollTop: $(".find-out-more").offset().top},
        'slow');
    });
    $("#menuAbout").click(function(e){
         $('html,body').animate({
            scrollTop: $(".about").offset().top},
        'slow');
    });
    

    /* Drag scrolling */
    var clicked = false, clickX;
    var lastX;
    var scrollSpeed = 7;
    $(".dragscroll").on({
        'mousemove': function(e) {
            clicked && updateScrollPos(e);
        },
        'mousedown': function(e) {
            clicked = true;
            clickX = e.pageX;
            lastX = e.pageX;
        },
        'mouseup': function() {
            clicked = false;
            $('html').css('cursor', 'auto');
        }
    });

    var updateScrollPos = function(e) {
        $(".dragscroll").scrollLeft($(".dragscroll").scrollLeft() + (lastX - e.pageX) * scrollSpeed);
        lastX = e.pageX;
    }
});
