var starjobs;

var apiurl = "https://fullsand-starcollaborativeportal.cs61.force.com/PortalLoginPage/services/apexrest/JobPortal";

//var apiurl = "js/JobPortal.json";

// Parse salesforce opportunities' text
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        starjobs = JSON.parse(this.responseText);}
};

// Request info from Salesforce
xhr.open("GET", apiurl, false);
xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);

//Create variables for dropdowns
// Define unique values for job type filter
const arr_jobtypes = [...new Set(starjobs.map(item => item.Job_Type__c))];
// Define unique values for location filter
//const arr_locations = [...new Set(starjobs.map(item => item.AVTRRT__Job_City__c +", "+item.AVTRRT__State__c))];
const arr_locations = [...new Set(starjobs.map(item => item.AVTRRT__State__c))];

// Define unique values for focus areas
const arr_focus_areas = [...new Set(starjobs.map(item => item.MC_IntersetGroup__c))];
//Confirm that all dropdown arrays are working.

//Write dropdowns for jobtypes
var frm_jobtypes = document.getElementById("job_types");
for(var i = 0; i < arr_jobtypes.length; i++) {
    var jt = arr_jobtypes[i];
    var el = document.createElement("option");
    el.textContent = jt;
    el.value = jt;
    frm_jobtypes.appendChild(el);
}

//Write dropdowns for locations
var frm_locations = document.getElementById("locations");
for(var i = 0; i < arr_locations.length; i++) {
    var loc = arr_locations[i];
    var el = document.createElement("option");
    el.textContent = loc;
    el.value = loc;
    frm_locations.appendChild(el);
}

/*
//Write dropdowns for focus areas
var frm_focus = document.getElementById("focus_areas");
for(var i = 0; i < arr_focus_areas.length; i++) {
    var fa = arr_focus_areas[i];
    var el = document.createElement("option");
    el.textContent = fa;
    el.value = fa;
    frm_focus.appendChild(el);
}*/

$("#starform").submit(function() {
    var data = $(this).serialize();
	console.log(data);
	xhr.open("GET", apiurl + "/?" + data, false);
	xhr.send();
	console.log(xhr.status);
	console.log(xhr.statusText);
	$(".fn-opportunities").click();
	console.log(starjobs);
	event.preventDefault();
});

//Initialize templates
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


