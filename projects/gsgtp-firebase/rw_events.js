//var dq = document.getElementById("dq");
//var dqreason = document.getElementById("dqreason");
//var frm_submitbtn = document.getElementById("submitbtn");

function writeEvent(eventName, eventDate,eventTime, address,city,state,time,track,description,list_points) {
	eventName = document.getElementById("eventName").value;
	eventDate = document.getElementById("eventDate").value;
	eventTime = document.getElementById("eventTime").value;
	address = document.getElementById("address").value;
	city = document.getElementById("city").value;
	state = document.getElementById("state").value;
	time = document.getElementById("time").value;
	track = document.getElementById("track").value;
	description = document.getElementById("description").value;
	list_points = document.getElementById("list_points").value;

	var firebaseref = firebase.database();
	// Define variables
	firebaseref.ref("scheduled/").push({
	eventName: eventName,
	eventDate:eventDate,
	eventTime:eventTime,
	address:address,
	city:city,
	state:state,
	time:time,
	track:track,
	description:description,
	points:list_points
	//vehicle:vehicle,
	//puller: puller,
	//distance: distance,
	});
	event.preventDefault();
}


$("#submitevent").click(function() {
	writeEvent();
	event.preventDefault();
});

$(document).ready(function(){
	var rootref = firebase.database().ref().child("schedule");
	rootref.on("child_added", snap => {
		var eventName = snap.child("eventName").val();
		var eventDate = snap.child("eventDate").val();
		var eventTime = snap.child("eventTime").val();
		var address = snap.child("address").val();
		var city = snap.child("city").val();
		var state = snap.child("state").val();
		var track = snap.child("track").val();
		var description = snap.child("description").val();
		var list_points = snap.child("points").val();

		$("#list_events").append(
			"<tr><td>"+eventName+"</td><td>"+eventDate+"</td><td>"+eventTime+"</td><td>"+address+"</td><td>"+
			city+"</td><td>"+state+"</td><td>"+track+"</td><td>"+description+"</td><td>"+list_points+"</td></tr>");

		console.log(snap.val());
	});
});
