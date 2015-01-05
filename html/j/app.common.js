$(document).ready(function(){
	$("a.double-hover").live("mouseover", function() {
		$(this).parents(".double-hover-wrap:first").find("a[href='" + $(this).attr("href") + "']").addClass("pseudo-hover");
	});
	$("a.double-hover").live("mouseout", function() {
		$(this).parents(".double-hover-wrap:first").find("a[href='" + $(this).attr("href") + "']").removeClass("pseudo-hover");
	});
});