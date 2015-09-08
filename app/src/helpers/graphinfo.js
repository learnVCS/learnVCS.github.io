$(document).ready(function(){
	mouseEvents();
});

function mouseEvents() {
	console.log("in mouse events");
	//check for clicking the document -- close all tooltips
	$(document).on("click", function(e){
		console.log("clicked on the document");
		if(!$(e.target).hasClass("text-wrapper")) {
			$(".text-wrapper").removeClass("active");
			console.log("is not the text-wrapper");
		}
	});
}