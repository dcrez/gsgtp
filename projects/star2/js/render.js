"use strict";

var starjobs;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        starjobs = JSON.parse(this.responseText);}
};

xhr.open("GET", "https://fullsand-starcollaborativeportal.cs61.force.com/PortalLoginPage/services/apexrest/JobPortal", false);
xhr.send();
console.log(xhr.status);
console.log(xhr.statusText);

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


