$(document).ready(function(){
	handleClick();
});

function handleClick() {
	console.log("listening for clicks");
	$(".searchIcon").on("click", function(e){
		$(".searchIcon").toggleClass("searchIcon_active");
		$(".searchModal").toggleClass("searchModal_active");
	});

	$(".navigation__icon").on("click", function(e){
		console.log("clicked");
		$(".navigation__list").toggleClass("navigation__list_active");
		$(".navigation__icon").toggleClass("navigation__icon_active");
	});
}