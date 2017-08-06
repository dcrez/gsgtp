"use strict";


//window.alert("page is loading!");
console.log("page loaded");

function writePull(puller, vehicle, vehicleClass, scheduledEvent, distance, pullOrder) {
var firebaseref = firebase.database();

// Define variables
puller = document.getElementById("puller").value;
vehicle = document.getElementById("vehicle").value;
scheduledEvent = document.getElementById("scheduledEvent").value;
vehicleClass = document.getElementById("vehicleClass").value;
distance = document.getElementById("distance").value;
pullOrder = document.getElementById("points").value;

firebaseref.ref("pulls/").push({
name: scheduledEvent,
vehicleClass:vehicleClass,
vehicle:vehicle,
pullOrder: pullOrder,
puller: puller,
distance: distance
	
});

event.preventDefault();
}

//
$("#submitbtn").click(function() {
	writePull();
	//getPull();
	event.preventDefault();
});
