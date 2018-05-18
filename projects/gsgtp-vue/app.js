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
                schedule: scheduleRef,
                member: memberRef,
                classList: classListRef,
                vehicleClass: vehicleClassRef,
                pulls:pullsRef,
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
                    this.newEvent.track='',
                    this.newEvent.time=''                    
                },
                deleteEvent: function() {
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
            addPuller: function() {
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
            },
            updatePuller: function() {
                pullsRef.update(this.updatePuller);
            },
            deletePuller: function (puller) {
                pullsRef.puller.child(puller['.key']).remove()
              },
            },
            computed: {
                futureEvents() {
                    return this.schedules.filter(schedule => moment().isSameOrAfter(scheduleRef.key.date) )
                },
                pastEvents() {
                    return this.schedules.filter(schedule => moment().isBefore(scheduleRef.key.date) )
                }
            }
        })
        