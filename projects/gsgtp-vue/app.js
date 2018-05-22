        var db = firebase.database();
        var scheduleRef = db.ref('schedule');
        var memberRef = db.ref('members');
        var vehicleClassRef = db.ref('vehicleClass');
        var classListRef = db.ref('vehicleClasses');
        var pullsRef = db.ref('pulls');
        
        new Vue({
            el:'#root',
            firebase: {
                    schedules: scheduleRef,
                    vehicleClass:vehicleClassRef,
                    scheduleObj: {
                    source:db.ref('schedule'),
                    asObject:true},
                    members: memberRef,
                    classList:classListRef,
                    pulls:pullsRef             
                },  
            data: {             
                todaysDate: new Date(),
                newEvent: 
                     {
                        name:'',
                        date:'',
                        time:'',
                        address:'',
                        city:'',
                        state:'',
                        description:'',
                        points:'',
                        track:'',
                        time:'',
                        created: new Date()
                    },
                editingEvent: null,
                schedules: [],
                member: memberRef,
                classList: classListRef,
                vehicleClass: vehicleClassRef,
                pulls:[],
                newMember: {
                    firstName: '',
                    lastName: '',
                    address: '',
                    city:'',
                    state:'',
                    zip:'',
                    phone:'',
                    email:'',
                    lastRenewal:'',
                },
                newPuller: {
                    distance:'',
                    points:'',
                    pullOrder: Math.floor(Math.random() *100),
                    puller: '',
                    scheduledEvent:'',
                    vehicle:'',
                    vehicleClass:[],
                    dq:'',
                    dqReason:''
                },
                updatedPuller: {
                    distance:'',
                    points:'',
                    pullOrder: '',
                    puller: '',
                    scheduledEvent:'',
                    vehicle:'',
                    vehicleClass:[],
                    dq:'',
                    dqReason:''
                }             
            },
            methods: {
                /* Events */
                addEvent: function() {
                    scheduleRef.push(this.newEvent),
                    console.log(this.newEvent),
                    this.newEvent.name=''
                    this.newEvent.date=''
                    this.newEvent.time='',
                    this.newEvent.description='',
                    this.newEvent.address='',
                    this.newEvent.city='',
                    this.newEvent.state='',
                    this.newEvent.points='',
                    this.newEvent.track=''
                },
                deleteEvent: function(schedule) {
                    scheduleRef.child(schedule['.key']).remove()
                },
                
                /*Members */
                addMember: function() {
                memberRef.push(this.newMember),
                    console.log(this.newMember),
                    this.newMember.name='',
                    this.newMember
                },

                /* Pullers */
            storePuller() {
                firebase.database().ref('pulls').push().set({
                    date: this.date, puller:this.puller,vehicle:this.vehicle, vehicleClass:this.vehicleClass})         
                },
            /*addPuller: function() {
                pullsRef.push(this.newPuller),
               this.newPuller.distance='',
               this.newPuller.pointsAwarded='',
               this.newPuller.pullOrder= Math.floor(Math.random() *100),
               this.newPuller.puller= '',
               this.newPuller.scheduledEvent='',
               this.newPuller.vehicle='',
               this.newPuller.vehicleClass=[],
               this.newPuller.dq='',
               this.newPuller.dqReason=''
            },*/
            updatePuller: function() {
                pullsRef.update(this.updatePuller);
            },
            deletePull: function (pull) {
                pull.child(pull['.key']).remove()
              },
            },
            created () {
                firebase.database().ref('pulls').on('child_added', snapshot => this.pulls.push({...snapshot.val(), id:snapshot.key}))
                //firebase.database().ref('schedules').on('value', snapshot => this.schedule .push({...snapshot.val(), id:snapshot.key}))
            },
            computed: {
                
            }
        })
        