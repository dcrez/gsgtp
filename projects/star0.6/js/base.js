"use strict";
// container for Salesforce array returned by HTTP request 
var starjobs = [];
var split_focus = [];

// URL of Salesforce service endpoint
var apiurl = "https://starcollaborativeportal.secure.force.com/services/apexrest/JobPortal"; 

// Request data from Salesforce 
var xhr = new XMLHttpRequest(); //console.log('UNSENT', xhr.readyState);

xhr.open('GET', apiurl + "?t=" + Math.random(), false);
console.log('OPENED', xhr.readyState);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 3) {
        console.log('LOADING', this.readyState);
    } else if (this.readyState === 4 && this.status === 200) {
        starjobs = JSON.parse(xhr.responseText);
        console.log("DONE!");
    }
	else {console.log("unhandled condition!");}
};

xhr.send();

sessionStorage.setItem('starjobs', JSON.stringify(starjobs));


// Populate list of jobs prior to user filtering list
    //Define template to view jobs
    var jobsTemplate = $("#jobs_template").html();

    //Compile template
    var compiledJobs = Handlebars.compile(jobsTemplate);

    //Define variable to display template
    var $jobs = $("#content");

    if ($("body").hasClass("job_details")) {} else {
            $jobs.html(compiledJobs(starjobs));
            console.log(starjobs);
        }


var sessionJobs = sessionStorage.getItem('starjobs');


// Build arrays for dropdowns
	//Define unique job types
	const arr_jobtypes = [...new Set(starjobs.map(item => item.Job_Type__c))];
	var frm_jobtypes = document.getElementById("job_types");
		for (var i = 0; i < arr_jobtypes.length; i++) {
			var jt = arr_jobtypes[i];
			var el = document.createElement("option");
			el.textContent = jt;
			el.value = jt;
			frm_jobtypes.appendChild(el);}
	
// Define unique locations
	const arr_locations = [...new Set(starjobs.map(item => item.AVTRRT__State__c))];
	var frm_locations = document.getElementById("locations");
		for (var i = 0; i < arr_locations.length; i++) {
			var loc = arr_locations[i];
			var el = document.createElement("option");
			el.textContent = loc;
			el.value = loc;
			frm_locations.appendChild(el);
		}


// Need to fix to not use underscore JS
// Define unique focus areas
	var arr_focus_areas = [...new Set(starjobs.map(item => item.MC_IntersetGroup__c))];

	const clean_focus = arr_focus_areas.filter(function(n){ return n !== undefined });

	arr_focus_areas = clean_focus;
	
var split_focus = [];
var frm_focus = document.getElementById("focus_areas");
frm_focus.innerHTML = "";

		
		for (var i = 0; i < arr_focus_areas.length; i++) {
		var fcs_item = arr_focus_areas[i];
		if (fcs_item !== undefined && fcs_item.indexOf(";") !== -1) {
		fcs_item.split(";"); // just split once
		split_focus.push(fcs_item[0]); // before the dot
		split_focus.push(fcs_item[1]); // after the dot
			}

		else if (fcs_item !== undefined) {
			split_focus.push(fcs_item);
		}
		else {console.log("error!");}
		console.log(split_focus);	
}


	//var clean_focus = split_focus.filter(function(n){ return n !== undefined });
	//var clean_focus = split_focus.filter(Boolean);
	//var unique_focus = [...new Set(clean_focus)];
	
/*
	for (var i = 0; i < split_focus.length; i++) {
    var uf = split_focus[i];
    var el = document.createElement("option");
    el.textContent = uf;
    el.value = uf;
    frm_focus.appendChild(el);
	}
*/