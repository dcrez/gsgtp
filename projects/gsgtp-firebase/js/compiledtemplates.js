"use strict";


$(document).ready(function() {
  //Define template
  var viewpulls = $("#pulls_template").html();
 	
  //Compile template
  var compiledPullsTemplate = Handlebars.compile(viewpulls);
 	
 //Unfathomable variable
	var $pullList = $(".pulls_container");
	
	var dbref = firebase.database().ref();
	if ($("body").hasClass("vehicle_details")) {	
		}
	else {
		dbref.on('value', function(snap) {
		$pullList.html(compiledPullsTemplate(snap.val()));
		console.log(snap.val());
	});
		//$(".pulls_container").html(compiledPullsTemplate(schd));
	}

	
	
	
});