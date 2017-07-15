"use strict";

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
console.log(split_focus);

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
	for (var j = 0; j < arr_loc.length ; j++) {
    if (arr_loc[j].Job_Type__c === jt) {
        arr_jt.push(arr_loc[j]);}}
	
	arr_fcs = starjobs.filter(function(focus){return focus.MC_IntersetGroup__c.match(fcs);});
	
	if (loc === "") {return false;} else {result = _.intersectionObjects(starjobs,arr_loc); starjobs = result; console.log("loc:", starjobs)}
	if (jt === "") {return false;} else {result = _.intersectionObjects(starjobs,arr_jt); starjobs = result; console.log("jt:", starjobs)}
	if (fcs === "") {return false;} else {result = _.intersectionObjects(starjobs,arr_fcs); starjobs = result; console.log("fcs:", starjobs)}
	
	if (starjobs === "") {document.getElementById("content").innerHTML = "<em>We can't find anything matching the criteria you provided. Try <a href='#'>searching again</a> or <a href='#'>subscribe</a> to get alerts about new roles as they become available.</em>";
}
}

// Call search function on submit
$(".fn-submit").click(function() {
	var data = $(this).serialize();
	xhr.open("GET", apiurl + "/?" + data, false);
	console.log("xhr-pre-send:", xhr);
	console.log("starjobs-pre-send:", starjobs);
	xhr.send();
	console.log(starjobs);
	dosubmit();
	$(".fn-opportunities").click();
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


