$(document).ready(function(){

    var lastMargin = parseFloat($($(".graph__centered").children()[0]).css("marginLeft"));

	/* Toggle the mobile navigation menu */
    $(".navigation__icon").click(function(e){
        $(".navigation__list").toggleClass("navigation__list_active");
        $(".navigation__icon").toggleClass("navigation__icon_active");
    });
    $(document).click(function (event) {
     if(!$(event.target).hasClass("navigation__icon")) {
         $(".navigation__list").removeClass("navigation__list_active");
         $(".navigation__icon").removeClass("navigation__icon_active");
     }
    });

    /* detectpage resizing */
    window.addEventListener('resize', function(event){
        var newMargin = parseFloat($($(".graph__centered").children()[0]).css("marginLeft"));
        var marginDiff = newMargin - lastMargin;
        var newModalMargin = parseFloat($(".graphModal").css("marginLeft")) + marginDiff;
        $(".graphModal").css("margin-left", newModalMargin + 'px');
        lastMargin = newMargin
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
