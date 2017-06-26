var vehicleClass_template, points_template, town_template, town_vehicle_template, town_places_template, vehicle_search_template;

var current_vehicleClass = points.vehicleClass[0];
var current_town = towns.town[0];
var current_town_class = current_town.vehicleClass[0];

function showTemplate(template, data) {
  var html = template(data);
  $('#content').html(html);
}

$(document).ready(function() {

  var source = $("#vehicleClass_template").html();
  vehicleClass_template = Handlebars.compile(source);

  source = $("#points_template").html();
  points_template = Handlebars.compile(source);

  source = $("#town_template").html();
  town_template = Handlebars.compile(source);

  source = $("#town_vehicle_template").html();
  town_vehicle_template = Handlebars.compile(source);

  source = $("#town_places_template").html();
  town_places_template = Handlebars.compile(source);

  source = $("#vehicle_search_template").html();
	vehicle_search_template = Handlebars.compile(source);

  // Navigation on Points Pill
  $("#points_pill").click(function() {

    // Show vehicleClass_template
    showTemplate(vehicleClass_template, points);

    // Change the pill display
    $(".nav-pills .active").removeClass("active");
    $("#points_pill").addClass("active");

    $(".vehicle-item").click(function(){
      var index = $(this).data("id");
      current_vehicleClass = points.vehicleClass[index];
      showTemplate(points_template, current_vehicleClass);
    });
  });

  $("#town_pill").click(function() {
    // Show town template
    showTemplate(town_template, towns);

    // Change the pill display
    $(".nav-pills .active").removeClass("active");
    $("#town_pill").addClass("active");

    $(".town-item").click(function(){
      var index = $(this).data("id");
      current_town = towns.town[index];
      showTemplate(town_vehicle_template, current_town);

      $(".town-vehicle-item").click(function(){
        var index = $(this).data("id");
        current_town_class = current_town.vehicleClass[index];
        showTemplate(town_places_template, current_town_class);
        //console.log(current_town_class);
      });
    });



	});

	$("#search_pill").click(function() {
		// Show search template
		showTemplate(vehicle_search_template, towns);

		$(".nav-pills .active").removeClass("active");
		$("#search_pill").addClass("active");

	//	$("#searchVehicles").keypress(function(e) {
	//		if (e.which == 13) {
	//			var search_text = $("#searchVehicles").val();
	//		console.log("search text:"+ search_text);
	//		}



  });

  $("#points_pill").click();
});


//function searchVehicles(vehicle)
