"use strict";


$(document).ready(function() {
  //Define template
  var viewpulls = $("#pulls_template").html();
  //var form_schedule = $("#frm_modal_events").html();

  //Compile template
  var compiledPullsTemplate = Handlebars.compile(viewpulls);
  //var compiledFormsSchedule = Handlebars.compile(form_schedule);

 //Unfathomable variable
	var $pullList = $(".pulls_container");
	//var $schdPull = $("fn-schedule-display");

	var dbref = firebase.database().ref().child('schedule');
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
