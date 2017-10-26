"use strict";
var starjobs = []; // container for Salesforce array returned by HTTP request 
var apiurl = "https://starcollaborativeportal.secure.force.com/services/apexrest/JobPortal"; // URL of Salesforce service endpoint
var jobs_template;

// Parse salesforce opportunities' text
var xhr = new XMLHttpRequest(); //console.log('UNSENT', xhr.readyState);

xhr.open('GET', apiurl + "?t=" + Math.random(), false);
console.log('OPENED', xhr.readyState);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 3) {
        console.log('LOADING', this.readyState);
    } else if (this.readyState === 4 && this.status === 200) {
        starjobs = JSON.parse(xhr.responseText);
        console.log("DONE!");
    } else { console.log("unhandled condition!"); }
};

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
    for (var i = 0; i < arr_focus_areas.length; i++) {
        var splitItem = arr_focus_areas[i].split(";"); // just split once
        split_focus.push(splitItem[0]); // before the dot
        split_focus.push(splitItem[1]); // after the dot
    }
}

// Make sure the focus areas can be read
split_focus = _.unique(split_focus);
split_focus = _.sortBy(split_focus);
split_focus = _.compact(split_focus);

//Write dropdowns for jobtypes
var frm_jobtypes = document.getElementById("job_types");
for (var i = 0; i < arr_jobtypes.length; i++) {
    var jt = arr_jobtypes[i];
    var el = document.createElement("option");
    el.textContent = jt;
    el.value = jt;
    frm_jobtypes.appendChild(el);
}

//Write dropdowns for locations
var frm_locations = document.getElementById("locations");
for (var i = 0; i < arr_locations.length; i++) {
    var loc = arr_locations[i];
    var el = document.createElement("option");
    el.textContent = loc;
    el.value = loc;
    frm_locations.appendChild(el);
}

//Write dropdowns for focus areas
var frm_focus = document.getElementById("focus_areas");
for (var i = 0; i < split_focus.length; i++) {
    var fa = split_focus[i];
    var el = document.createElement("option");
    el.textContent = fa;
    el.value = fa;
    frm_focus.appendChild(el);
}

var loc;
var jt;
var fcs; //form values
var result = []; //filter variables
var filtered_results = [];


function dosubmit() {
    //set variables
    loc = document.getElementById("locations").value;
    jt = document.getElementById("job_types").value;
    fcs = document.getElementById("focus_areas").value;
    result = [];

    // Create filtered array for locations
    for (var i = 0; i < starjobs.length; i++) {
        if (starjobs[i].AVTRRT__State__c === loc) {
            result.push(starjobs[i]);
            starjobs = result;
        } //if the location filter is selected, add all jobs that match to the location array
        // Create filtered array for job types (contract, direct hire, etc.)
        for (var j = 0; j < starjobs.length; j++) {
            if (starjobs[j].Job_Type__c === jt) {
                result.push(starjobs[j]);
            }
        } //if the job type filter is selected, add all jobs that match to the job type array
        // Create filtered array for focus groups (business analysis, project management, etc.)
        for (var m = 0; m < starjobs.length; m++) {
            if (starjobs[m].MC_IntersetGroup__c.indexOf(fcs) >= 0) { result.push(starjobs[m]); }
        } //if the focus group filter is selected, add all jobs that match the selected focus group to the focus array

        filtered_results = _.uniq(result);


        if (filtered_results.length < 1) {
            document.getElementById("form_error").innerHTML = 'We cannot find any opportunities that match the criteria you provided. Try <a href="#" class="fn-reset">searching again</a> or <a href="#" data-toggle="modal" data-target="#subscribeModal">subscribe</a> to get alerts about new roles as they become available.';
        } else {
            document.getElementById("form_error").innerHTML = "";
        }
    }

    // Call search function on submit
    $("#submitbtn").click(function() {
        console.log("clicked submit!");
        var data = $('#starform').serialize();
        xhr.open("GET", apiurl + "/?" + data, false);
        xhr.send();
        console.log(xhr);
        console.log(starjobs);
        dosubmit();
        $(".fn-opportunities").click();
        event.preventDefault();
        console.log("completed submit!");
    });

    $(".fn_reset").click(function() {
        console.log("clicked reset!");
        window.location.href = window.location.href;
        xhr.open('GET', apiurl + "?t=" + Math.random(), false);

    });

    //Initialize templates

    function showTemplate(template, data) {
        var html = template(data);
        $('#content').html(html);
    }

    $(document).ready(function() {
        var source = $("#jobs_template").html();
        jobs_template = Handlebars.compile(source);

        $(".fn-opportunities").click(function() { showTemplate(jobs_template, starjobs); });
        $(".fn-opportunities").click();
    });