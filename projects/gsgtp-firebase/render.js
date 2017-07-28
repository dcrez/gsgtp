// Initialize Firebase
var config = {
  apiKey: "AIzaSyCK3lJyrQ5qzYcqQorRlPkcoCGh38wdMW8",
  authDomain: "gsgtp-b4448.firebaseapp.com",
  databaseURL: "https://gsgtp-b4448.firebaseio.com",
  projectId: "gsgtp-b4448",
  storageBucket: "gsgtp-b4448.appspot.com",
  messagingSenderId: "553297979168"
};
firebase.initializeApp(config);

// Get a reference to the database service
var url = "https://gsgtp-b4448.firebaseio.com";
var firebaseRef = new Firebase(url);

function writePull(puller, vehicle, vehicleClass, scheduledEvent, distance, points) {
firebaseRef.set('pulls/' + scheduledEvent + '/' + vehicleClass).push({
  puller: puller.value,
  vehicle: vehicle.value,
  vehicleClass : vehicleClass.value,
  scheduledEvent: scheduledEvent.value,
  distance: distance.value,
  points: points.value
});
}

// Call search function on submit
$("#pullForm").click(function() {
  document.getElementById("pullForm").submit();
});

this.puller = document.getElementById("puller");
this.vehicle = document.getElementById("vehicle");
this.scheduledEvent = document.getElementById("scheduledEvent");
this.vehicleClass = document.getElementById("vehicleClass");
this.distance = document.getElementById("distance");
this.points = document.getElementById("points");
this.dq = document.getElementById("dq");
this.dqreason = document.getElementById("dqreason");
