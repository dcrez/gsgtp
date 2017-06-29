"use strict";

var jobs_template, jobs_detail_template, jobs_apply_frame;

var current_job = opportunities[0];

function showTemplate(template, data) {
  var html = template(data);
  $('#content').html(html);
}

$(document).ready(function() {
var source = $("#jobs_template").html();
jobs_template = Handlebars.compile(source);

source = $("#jobs_detail_template").html();
jobs_detail_template = Handlebars.compile(source);
	
source = $("#jobs_apply_frame").html();
jobs_apply_frame = Handlebars.compile(source);
	
$(".fn-opportunities").click(function() {

    // Show opportunities
    showTemplate(jobs_template, opportunities);
	$(".fn-details-breadcrumb").remove();
	$(".fn-apply-breadcrumb").remove();

	
	$(".fn-details").click(function() {
	var index = $(this).data("id");
		
	current_job = opportunities.starjobs[index];
	$(".breadcrumb").append("<li class=\"breadcrumb-item active fn-details-breadcrumb fn-details\">"+current_job.name+" #"+current_job.jobid+"</li>");
	showTemplate(jobs_detail_template, current_job);
	
	$(".fn-apply").click(function() {
		var index = $(this).data("id");
		current_job = opportunities.starjobs[index];
		$(".fn-details-breadcrumb").removeClass("active");

		$(".breadcrumb").append("<li class=\"breadcrumb-item active fn-apply-breadcrumb\">Apply</li>");
		
		showTemplate(jobs_apply_frame, current_job);
	});
	
			
});
});


	
$(".fn-opportunities").click();

});

//Search that waits for hitting the e key
