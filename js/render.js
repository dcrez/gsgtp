// JavaScript Document

// Define templates in use on SPA
	var marketing_template, marketing_detail_template;

// Define variables where we need to track state or navigation
	var current_marketing = marketing.marketing_content[0];
// 
	function showTemplate(template,data) {
		var html = template(data);
		$('#marketing').html(html);
	}

	
	$(document).ready(function() {
		
	var source = $('#marketing_template').html();
	marketing_template = Handlebars.compile(source);
		
	var source = $('#marketing_detail_template').html();
	marketing_detail_template = Handlebars.compile(source);
	
	// Show marketing content
	
		$(".js-marketing-parent").click(function(){
			showTemplate(marketing_template, marketing);
			var current_marketing = marketing.marketing_content[0];
			
	// Display sub content	
		$(".js-marketing-detail").click(function(){
			var index = $(this).data("id");
			current_marketing = marketing.marketing_content[index];
			showTemplate(marketing_detail_template, current_marketing);
			console.log(current_marketing);
		});
		
		});
		
		$(".js-marketing-parent").click();
		var current_marketing = marketing.marketing_content[0];
		console.log("Marketing parent is clicked!");
	});
		