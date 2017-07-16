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

//Create variables for dropdowns
// Define unique values for job type filter
const arr_jobtypes = [...new Set(starjobs.map(item => item.Job_Type__c))];
// Define unique values for location filter
//const arr_locations = [...new Set(starjobs.map(item => item.AVTRRT__Job_City__c +", "+item.AVTRRT__State__c))];
const arr_locations = [...new Set(starjobs.map(item => item.AVTRRT__State__c))];

// Define unique values for focus areas
const arr_focus_areas = [...new Set(starjobs.map(item => item.MC_IntersetGroup__c))];

var split_focus = [];
for (var i = 0; i < arr_focus_areas.length; i++) {
    var split = arr_focus_areas[i].split(";");  // just split once
    split_focus.push(split[0]); // before the dot
    split_focus.push(split[1]); // after the dot
}

split_focus = _.unique(split_focus); 
split_focus = _.sortBy(split_focus);
split_focus = _.compact(split_focus);

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


//Write dropdowns for focus areas
var frm_focus = document.getElementById("focus_areas");
for(var i = 0; i < split_focus.length; i++) {
	var fa = split_focus[i];
    var el = document.createElement("option");
    el.textContent = fa;
    el.value = fa;
    frm_focus.appendChild(el);
}

var loc; var jt; var fcs; //form values
var arr_loc = []; var arr_jt = []; var arr_fcs = []; var result = []; //filter variables

// Check intersection of arrays
_.intersectionObjects = _.intersect = function(array) {
    var slice = Array.prototype.slice;
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        //return _.indexOf(other, item) >= 0;
        return _.any(other, function(element) { return _.isEqual(element, item); });
      });
    });
  };

function dosubmit() {
	//set variables
	loc = document.getElementById("locations").value;
	jt = document.getElementById("job_types").value;
	fcs = document.getElementById("focus_areas").value;
	
	// Create filtered array for job types
	for (var i = 0; i < starjobs.length ; i++) {
    if (starjobs[i].AVTRRT__State__c === loc) {
        arr_loc.push(starjobs[i]);}}
	
	// Create filtered array for locations
	for (var j = 0; j < starjobs.length ; j++) {
    if (starjobs[j].Job_Type__c === jt) {
        arr_jt.push(starjobs[j]);}}
	
	//arr_fcs = starjobs.filter(function(focus){return focus.MC_IntersetGroup__c.match(fcs);});
	
	for (var m = 0; m < starjobs.length; m++) {
		if(starjobs[m].MC_IntersetGroup__c.indexOf(fcs) > 0) {arr_fcs.push(starjobs[m]);}
	}
	
	if (loc == "") {arr_loc = [];} else {result = _.intersectionObjects(starjobs,arr_loc); starjobs = result; console.log("loc:", starjobs);}
	if (jt == "") {arr_jt = [];} else {result = _.intersectionObjects(starjobs,arr_jt); starjobs = result; console.log("jt:", starjobs);}
	if (fcs == "") {arr_fcs = [];} else {result = _.intersectionObjects(starjobs,arr_fcs); starjobs = result; console.log("fcs:", starjobs);}
	
	if (starjobs.length < 1) {document.getElementById("form_error").innerHTML = "We can't find any opportunities that match the criteria you provided. Try searching again or subscribe to get alerts about new roles as they become available.";
}
}

// Call search function on submit
$("#starform").click(function() {
	var data = $(this).serialize();
	xhr.open("GET", apiurl + "/?" + data, false);
	xhr.send();
	dosubmit();
	$(".fn-opportunities").click();
	event.preventDefault();
});

$(".fn-reset").click(function() {
	location.reload();
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


