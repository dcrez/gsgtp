"use strict";

function randomNumber(len) {
    var randomNumber;
    var n = '';

    for (var count = 0; count < len; count++) {
        randomNumber = Math.floor(Math.random() * 10);
        n += randomNumber.toString();
    }
    return n;
}


//window.alert("page is loading!");
console.log("page loaded");

function writeSignUp(puller, vehicle, vehicleClass, scheduledEvent, pullOrder) {

    // Define variables
    puller = document.getElementById("puller").value;
    vehicle = document.getElementById("vehicle").value;
    scheduledEvent = document.getElementById("scheduledEvent").value;
    vehicleClass = document.getElementById("vehicleClass").value;
    //distance = document.getElementById("distance").value;
    //pullOrder = document.getElementById("points").value;
    //townName = document.getElementById("townName").value;
    pullOrder = randomNumber(2);
    //timestamp = new Date().toString();

    var refVehicles = firebase.database().ref('vehicles').child('vehicleClass/' + vehicleClass);
    // var refPoints = firebase.database().ref().child('points');

    var pullsRef = {
        scheduledEvent: scheduledEvent,
        pullOrder: pullOrder,
        puller: puller,
        vehicle: vehicle,
        vehicleClass: vehicleClass
            //distance: distance
            //timestamp: timestamp
    };

    //var pullRef = (refVehicles).push(pullsRef);
    var newPullKey = firebase.database().ref().child('results').push().key;
    var updates = {};   
    updates['/results/' + 'vehicleClass/' + vehicleClass + '/' + newPullKey] = pullsRef;
    //updates['/events/' + scheduledEvent] = pullsRef;
    //updates['/vehicles/' + vehicle + '/puller/' + puller] = pullsRef;
    updates['/vehicleClass/' + vehicleClass + '/' + newPullKey] = pullsRef;
    //event.preventDefault();
    return firebase.database().ref().update(updates);
}

function writePull(puller, vehicle, vehicleClass, scheduledEvent, townName, place, distance) {

    // Define variables
    puller = document.getElementById("puller").value;
    vehicle = document.getElementById("vehicle").value;
    scheduledEvent = document.getElementById("scheduledEvent").value;
    vehicleClass = document.getElementById("vehicleClass").value;
    distance = document.getElementById("distance").value;
    //pullOrder = document.getElementById("pullOrder").value;
    //townName = document.getElementById("townName").value;

    isPoints = document.getElementById("isPoints").value;
    timestamp = new Date().toString();

    if (isPoints = true) {
        place = document.getElementById("place").value;
        points = documents.getElementById("points").value;
    } else {
        place = null;
        points = null;
    }

    var refVehicles = firebase.database().ref('vehicles').child('vehicleClass/' + vehicleClass);
    // var refPoints = firebase.database().ref().child('points');

    var pullsRef = {
        townName: scheduledEvent,
        place: place,
        puller: puller,
        vehicle: vehicle,
        //distance: distance
        // timestamp
    };

    //var pullRef = (refVehicles).push(pullsRef);
    /*var newPullKey = firebase.database().ref().child('pulls').push().key;
    var updates = {};
    updates['/pulls/' + newPullKey] = pullsRef;
    updates['/events/' + scheduledEvent + '/' + newPullKey] = pullsRef;
    updates['/vehicles/' + vehicle + '/' + newPullKey] = pullsRef;
    updates['/vehicleClass/' + vehicleClass + '/' + newPullKey] = pullsRef;*/
    //event.preventDefault();
}



function writeSched(eventName, schdDate, schdTime, address, city, state, zip, track, description, isPoints) {

    eventName = document.getElementById("eventName").value;
    schdDate = document.getElementById("schdDate").value;
    schdTime = document.getElementById("schdTime").value;
    address = document.getElementById("address").value;
    city = document.getElementById("city").value;
    state = document.getElementById("state").value;
    zip = document.getElementById("zip").value;
    track = document.getElementById("track").value;
    description = document.getElementById("description").value;
    isPoints = document.getElementById("isPoints").value;

    var refSched = firebase.database().ref('schedule').child('eventName: ' + '"' + eventName + '"');

    console.log("variables defined");

    var scheduledEvent = {
        eventName: eventName,
        schdDate: schdDate,
        schdTime: schdTime,
        address: address,
        city: city,
        state: state,
        zip: zip,
        track: track,
        description: description,
        isPoints: isPoints
    };
    console.log(scheduledEvent);
    var schdWrite = refSched.set(scheduledEvent);
    console.log(schdWrite);
    console.log("event should be in firebase now.");
    //event.preventDefault();

}

//
$("#submitbtn").click(function() {
    writeSignUp();
    //getPull();
    //event.preventDefault();
});

$("#submitevent").click(function() {
    writeSched();
    //event.preventDefault();
});


/*
$(document).ready(function() {
    var scheduleOptionsRef = firebase.database().ref('schedule');
    const scheduledEvents = scheduleOptionsRef;
    scheduleOptionsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childsnapshot) {
            var key = childsnapshot.key;
            $("#scheduledEveny").append('<option value="' + key + '">' + key + '</option>');
        });
    });
});

$(document).ready(function() {
    var vehicleClassesRef = firebase.database().ref('vehicleClasses');
    vehicleClassesRef.on('value',
        function(snapshot) {
            //for (var i = 0; i < snapshot.length; i++) {
            $("#vehicleClass").append('<option value="' + (snapshot.val()) + '">' + (snapshot.val()) + '</option>');
            //option.appendChild(document.createTextNode(snapshot.val().eventName, schdDate));
            //select.appendChild(option);
            //}
        });
});*/