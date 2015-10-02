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
});
