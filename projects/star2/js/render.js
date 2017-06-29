"use strict";

var opportunities; 

		$.getJSON('https://fullsand-starcollaborativeportal.cs61.force.com/PortalLoginPage/services/apexrest/JobPortal')
		.done(function (data) {
		opportunities = data;
			
		var jobs_template;

function showTemplate(template, data) {
  var html = template(data);
  $('#content').html(html);
}

$(document).ready(function() {
var source = $("#jobs_template").html();
jobs_template = Handlebars.compile(source);
	
$(".fn-opportunities").click(function() {

    // Show opportunities
    showTemplate(jobs_template, opportunities);
});

$(".fn-opportunities").click();

});

			
		});