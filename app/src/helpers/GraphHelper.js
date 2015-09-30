$(document).ready(function(){
	handleClick();
	addListeners();
});

function handleClick() {
	$(".searchIcon").on("click", function(e){
		$(".searchIcon").toggleClass("searchIcon_active");
		$(".searchModal").toggleClass("searchModal_active");
	});

	$(".navigation__icon").on("click", function(e){
		console.log("clicked");
		//$(".navigation__list").css("zIndex", -120);
		$(".navigation__list").toggleClass("navigation__list_active");
		$(".navigation__icon").toggleClass("navigation__icon_active");
	});
}

function addListeners() {
	var element = document.getElementById("menu");
	if($(".navigation__list_active")) {
		element.addEventListener("transitionend", bringToFront, false);
	}
}

function bringToFront() {
  //$(".navigation__list_active").css("zIndex", 100);
}
