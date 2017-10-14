"use strict";
// container for Salesforce array returned by HTTP request 
var starjobs = []; 

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
	const arr_focus_areas = [...new Set(starjobs.map(item => item.MC_IntersetGroup__c))];

	var split_focus = [];
	for (var i = 0; i < arr_focus_areas.length; i++) {
		for (var i = 0; i < arr_focus_areas.length; i++) {
		var splitItem = arr_focus_areas[i].split(";"); // just split once
		split_focus.push(splitItem[0]); // before the dot
		split_focus.push(splitItem[1]); // after the dot
	}
	}

	//var clean_focus = split_focus.filter(function(n){ return n !== undefined });
	var clean_focus = split_focus.filter(Boolean);
	var unique_focus = [...new Set(clean_focus)];
	
	var frm_focus = document.getElementById("focus_areas");
	for (var i = 0; i < unique_focus.length; i++) {
    var uf = unique_focus[i];
    var el = document.createElement("option");
    el.textContent = uf;
    el.value = uf;
    frm_focus.appendChild(el);
	}


var loc;
var jt;
var fcs; //form values
var arr_loc = [];
var arr_jt = [];
var arr_fcs = [];
var result = []; //filter variables

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
    for (var i = 0; i < starjobs.length; i++) {
        if (starjobs[i].AVTRRT__State__c === loc) {
            arr_loc.push(starjobs[i]);
        }
    }

    // Create filtered array for locations
    for (var j = 0; j < starjobs.length; j++) {
        if (starjobs[j].Job_Type__c === jt) {
            arr_jt.push(starjobs[j]);
        }
    }

    //arr_fcs = starjobs.filter(function(focus){return focus.MC_IntersetGroup__c.match(fcs);});

    for (var m = 0; m < starjobs.length; m++) {
        if (starjobs[m].MC_IntersetGroup__c.indexOf(fcs) >= 0) { arr_fcs.push(starjobs[m]); }
    }

    if (loc == "") { arr_loc = []; } else {
        result = _.intersectionObjects(starjobs, arr_loc);
        starjobs = result;
        console.log("loc:", starjobs);
    }
    if (jt == "") { arr_jt = []; } else {
        result = _.intersectionObjects(starjobs, arr_jt);
        starjobs = result;
        console.log("jt:", starjobs);
    }
    if (fcs == "") { arr_fcs = []; } else {
        result = _.intersectionObjects(starjobs, arr_fcs);
        starjobs = result;
        console.log("fcs:", starjobs);
    }

    if (starjobs.length < 1) {
        document.getElementById("form_error").innerHTML = 'We cannot find any opportunities that match the criteria you provided. Try <a href="#" class="fn-reset">searching again</a> or <a href="#" data-toggle="modal" data-target="#subscribeModal">subscribe</a> to get alerts about new roles as they become available.';
    }
}

// Call search function on submit
$("#starform").click(function() {
    console.log("clicked submit!");
    var data = $(this).serialize();
    arr_loc = [];
    arr_fcs = [];
    arr_jt = [];
    xhr.open("GET", apiurl + "/?" + data, false);
    xhr.send();
    dosubmit();
    $(".fn-opportunities").click();
    event.preventDefault();
    console.log("completed submit!");
});

$(".fn_reset").click(function() {
    console.log("clicked reset!");
    window.location.href = window.location.href;
});

	


	