"use strict";


// Sign In
$(document).ready(function() {
    //Define template to view pulls
    var viewpulls = $("#pulls_template").html();
    //var form_schedule = $("#frm_modal_events").html();

    //Compile template
    var compiledPullsTemplate = Handlebars.compile(viewpulls);
    //var compiledFormsSchedule = Handlebars.compile(form_schedule);

    //Unfathomable variable
    var $pullList = $(".pulls_container");

    var dbref = firebase.database().ref('events');
    if ($("body").hasClass("vehicle_details")) {} else {
        dbref.on('value', function(snap) {
            $pullList.html(compiledPullsTemplate(snap.val()));
            console.log(snap.val());
        });
        //$(".pulls_container").html(compiledPullsTemplate(schd));
    };

});

// Edit a Pull
$(document).ready(function() {

    function showTemplate(template, data) {
        var html = template(data);
        $('#editPullContainer').html(html);
    }

    //Define template to view pulls
    $("#editPull").click(function() {
        var index = $(this).data("id");
        currentPull = dbref[index];
        console.log(currentPull);

        var editPulls = $("#editPull_template").html();

        //Compile template
        var compiledEditPullTemplate = Handlebars.compile(editPulls);

        //Unfathomable variable
        var $editOnePull = $(".editPull_container");

        var dbref = firebase.database().ref('pulls');
        if ($("body").hasClass("vehicle_details")) {} else {
            dbref.on('value', function(snap) {
                showTemplate(editPull_template, (snap.val()));
                console.log(snap.val());
            });
            //$(".pulls_container").html(compiledPullsTemplate(schd));
        };
    });
});

// Events
$(document).ready(function() {
    // Define template to view scheduled events
    var viewEvents = $("#schedule_template").html();
    console.log(viewEvents);
    //Compile template
    var compiledScheduleTemplate = Handlebars.compile(viewEvents);
    console.log(compiledScheduleTemplate);
    // Define location where template will be rendered
    var $schdPull = $(".schedule_container");
    // Read data from firebase into handlebars template
    var scheddbref = firebase.database().ref('schedule');
    if ($("body").hasClass("something")) {} else {
        scheddbref.on('value', function(snap) {
            console.log(snap.val());
            $schdPull.html(compiledScheduleTemplate(snap.val()));
            console.log(snap.val());
        });
    }
});