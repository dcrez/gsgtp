"use strict";


//window.alert("page is loading!");
console.log("page loaded");

//var dq = document.getElementById("dq");
//var dqreason = document.getElementById("dqreason");
//var frm_submitbtn = document.getElementById("submitbtn");


function writePull(puller, vehicle, vehicleClass, scheduledEvent, distance, points) {
var firebaseref = firebase.database();
	
// Define variables
puller = document.getElementById("puller").value;
vehicle = document.getElementById("vehicle").value;
scheduledEvent = document.getElementById("scheduledEvent").value;
vehicleClass = document.getElementById("vehicleClass").value;
distance = document.getElementById("distance").value;
points = document.getElementById("points").value;
	
firebaseref.ref("pulls/"+scheduledEvent+"/"+vehicleClass).push({
vehicle:vehicle,
puller: puller,
distance: distance,
points: points
});
event.preventDefault();
}


/*function submitpull() {
	var firebaseref = firebase.database().ref();
	var pullerText = puller.value;
	firebaseref.child("text").set(pullerText);
	console.log("submitted to firebase");
	event.preventDefault();

}*/

// Call search function on submit
$("#submitbtn").click(function() {
	//submitpull();
	writePull();
	event.preventDefault();
});


//var newPullRef = pullListRef.push();
//newPullRef.set({});