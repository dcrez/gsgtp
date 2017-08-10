"use strict";


//window.alert("page is loading!");
console.log("page loaded");

function writePull(puller, vehicle, vehicleClass, scheduledEvent, distance, townName,place) {
var refTowns = firebase.database().ref('towns').child('town');
var refPoints = firebase.database().ref().child('points');

	
// Define variables
puller = document.getElementById("puller").value;
vehicle = document.getElementById("vehicle").value;
scheduledEvent = document.getElementById("scheduledEvent").value;
vehicleClass = document.getElementById("vehicleClass").value;
distance = document.getElementById("distance").value;
//pullOrder = document.getElementById("points").value;
//townName = document.getElementById("townName").value;
place = document.getElementById("points").value;
//timestamp = new Date().toString();

var pullsRef = {
            townName: scheduledEvent,
            vehicleClass: [{
                name: vehicleClass,
                vehicles: [{
                    place: place,
                    puller: puller,
                    vehicle: vehicle,
                    distance: distance
                }]
                }]
            };
	
var pullRef = refTowns.push(pullsRef);

event.preventDefault();
}

function writeSched(townName,schdDate,schdTime,address,city,state,track,description,evaluation) {
	var refSched = firebase.database().ref('schedule');
	console.log(refSched);

	
	townName = document.getElementById("townName");
	schdDate = document.getElementById("schdDate");
	schdTime = document.getElementById("schdTime");
	address = document.getElementById("address");
	city = document.getElementById("city");
	state = document.getElementById("state");
	track = document.getElementById("track");
	description = document.getElementById("description");
	evaluation = document.getElementById("evaluation");
	
	console.log("variables defined");
	
	var scheduledEvent = {
		townName:townName,
		schdDate:schdDate,
		schdTime:schdTime,
		address:address,
		city:city,
		state:state,
		track:track,
		description:description,
		evaluation:evaluation
	};
	
	var schdWrite = refSched.push(scheduledEvent);
	event.preventDefault();

}

//
$("#submitbtn").click(function() {
	writePull();
	//getPull();
	event.preventDefault();
});

$("submitevent").click(function(){
	writeSched();
	event.preventDefault();
});
