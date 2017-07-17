import { Template } from 'meteor/templating';

import { Pulls } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
  pulls() {
    // Show newest pulls at the top
       return Pulls.find({}, { sort: { createdAt: -1 } });
       },
});


Template.body.events({
 'submit .new-pull'(event) {
   // Prevent default browser form submit
   event.preventDefault();

   // Get value from form element
   const target = event.target;
   const text = target.text.value;
   const place = target.place.value;
   const vehicle_class = target.vehicle_class.value;
   const puller = target.puller.value;
   const distance = target.distance.value;
   const points = target.points.value;

   // Insert a oull into the collection
   Pulls.insert({
     place,
     vehicle_class,
     puller,
     vehicle,
     distance,
     points,
     createdAt: new Date(), // current time
   });

   // Clear form
   target.text.value = '';
   target.place.value = '';
   target.vehicle_class.value = '';
   target.puller.value = '';
   target.vehicle.value = '';
   target.distance.value = '';
   target.points.value = '';
 },
});
