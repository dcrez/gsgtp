"use strict";

var opportunities = new XMLHttpRequest();
opportunities.open("GET", "https://fullsand-starcollaborativeportal.cs61.force.com/PortalLoginPage/services/apexrest/JobPortal", false);
opportunities.send();
console.log(opportunities.status);
console.log(opportunities.statusText);

var starjobs = JSON.parse(opportunities);
console.log(starjobs);


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
    showTemplate(jobs_template, starjobs);
});

$(".fn-opportunities").click();

});


