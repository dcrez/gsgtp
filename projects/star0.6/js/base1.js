//"use strict";

/* Disable minification (remove `.min` from URL path) for more info */

(function(undefined) {}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

// container for Salesforce array returned by HTTP request 
function showTemplate(template, data) {
    var html = template(data);
    $("#content").html(html); // Your code here
}


var starjobs = [];
var split_focus = [];

// URL of Salesforce service endpoint
var apiurl = "https://starcollaborativeportal.secure.force.com/services/apexrest/JobPortal";

// Request data from Salesforce 
var xhr = new XMLHttpRequest(); //console.log('UNSENT', xhr.readyState);

//xhr.addEventListener("load", transferComplete);


xhr.open('GET', apiurl + "?t=" + Math.random(), false);
console.log('OPENED', xhr.readyState);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 3) {
        console.log('LOADING', this.readyState);
    } else if (this.readyState === 4 && this.status === 200) {
        starjobs = JSON.parse(xhr.responseText);
        console.log("DONE!");
    } else { console.log("unhandled condition!");
            console.log(this.readyState);
            console.log(xhr.responseText) }
};

xhr.send();

//Define template to view jobs
var jobsTemplate = $("#jobs_template").html();

//Compile template
var compiledJobs = Handlebars.compile(jobsTemplate);

//Define variable to display template
var $jobs = $("#content");

//var source = $("#jobs_template").html();
//var jobs_template = Handlebars.compile(source);


//xhr.onloadend = function() {
//  showTemplate(compiledJobs, starjobs);
//}

if ($("body").hasClass("job_details")) {} else { showTemplate(compiledJobs, starjobs); }


//var sessionJobs = sessionStorage.getItem('starjobs');


// Build arrays for dropdowns
//Define unique job types
const arr_jobtypes = [...new Set(starjobs.map(item => item.Job_Type__c))];
var frm_jobtypes = document.getElementById("job_types");
for (var i = 0; i < arr_jobtypes.length; i++) {
    var jt = arr_jobtypes[i];
    var el = document.createElement("option");
    el.textContent = jt;
    el.value = jt;
    frm_jobtypes.appendChild(el);
}

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

const clean_focus = arr_focus_areas.filter(function(n) { return n !== undefined });

arr_focus_areas = clean_focus;

var split_focus = [];
var frm_focus = document.getElementById("focus_areas");

// Break out focus areas
for (var i = 0; i < arr_focus_areas.length; i++) {
    for (var i = 0; i < arr_focus_areas.length; i++) {
        //var fcs_item = arr_focus_areas[i];
        var fcs_item = arr_focus_areas[i].split(";"); // just split once
        split_focus.push(fcs_item[0]); // before the dot
        split_focus.push(fcs_item[1]); // after the dot 
    }
}

// Remove undefined items from focus areas
var clean_fcs_areas = split_focus.filter(function(n) { return n !== undefined; });
var ordered_fcs_areas = _.sortBy(clean_fcs_areas);
var arr_fcs_clean = [...new Set(ordered_fcs_areas)];

var frm_focus = document.getElementById("focus_areas");
for (var i = 0; i < arr_fcs_clean.length; i++) {
    var fa = arr_fcs_clean[i];
    var el = document.createElement("option");
    el.textContent = fa;
    el.value = fa;
    frm_focus.appendChild(el);
}

var loc;
var jt;
var fcs; //form values
var result = []; //filter variables
var arr_loc = [];
var arr_fcs = [];
var arr_jt = [];


function dosubmit() {
    //set variables
    loc = document.getElementById("locations").value;
    jt = document.getElementById("job_types").value;
    fcs = document.getElementById("focus_areas").value;

    arr_loc = [];
    arr_fcs = [];
    arr_jt = [];

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
            

    // Create filtered array for focus areas
    for (var m = 0; m < starjobs.length; m++) {
        var item = starjobs[m].MC_IntersetGroup__c;
        if (item === undefined) {
            console.log("missing focus area")
        }
        else if (item.indexOf(fcs) >= 0) {
            arr_fcs.push(starjobs[m]);
            console.log('fcs:', arr_fcs);
        }
    }

    if (fcs == "") { arr_fcs = []; } else {
        result = _.intersection(starjobs, arr_fcs);
        starjobs = result;
        //console.log("fcs:", starjobs);
    }

    if (loc == "") { arr_loc = []; } else {
        result = _.intersection(starjobs, arr_loc);
        starjobs = result;
        //console.log("loc:", starjobs);
    }

    if (jt == "") { arr_jt = []; } else {
        result = _.intersection(starjobs, arr_jt);
        starjobs = result;
        //console.log("jt:", starjobs);
    }


    if (starjobs.length < 1) {
        document.getElementById("form_error").innerHTML = 'We cannot find any opportunities that match the criteria you provided. Try <input type="button" onclick="resetForm()" value="searching again" class="btn btn-link star-red mx-0 px-0 my-0 py-0"> or <a href="#" data-toggle="modal" data-target="#subscribeModal">subscribe</a> to get alerts about new roles as they become available.';
    } else {
        document.getElementById("form_error").innerHTML = "";
    }

}




// Call search function on submit
$("#submitbtn").click(function() {
    NProgress.start();
    console.log("clicked submit!");
    var data = $("#srch").serialize();
    xhr.open("GET", apiurl + "/?" + data, false);
    xhr.send();
    dosubmit();
    showTemplate(compiledJobs, starjobs);
    document.getElementById("countStar").innerHTML = starjobs.length;
    event.preventDefault();
    console.log("completed submit!");
    NProgress.done();
});

// Reset the Form
function resetForm() {
    $("#btn-clear").fadeOut();
    document.getElementById("starform").reset();
}

function fn_reset() {
    NProgress.start();
	xhr.open("GET", apiurl + "/?" + data, false);
    xhr.send();
    showTemplate(compiledJobs,starjobs);
    document.getElementById("countStar").innerHTML = starjobs.length;
    NProgress.done();
}