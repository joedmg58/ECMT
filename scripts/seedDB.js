const mongoose = require('mongoose');
const db = require('../models');

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const password = 'password';
hash.update( password );
const codedPassword = hash.digest('hex');

var isoDate = new Date().toISOString();


//user collection seeds
const userSeed = [
    {
        firstName: "Joed",
        lastName: "Machado",
        email: "joedmg58@gmail.com",
        password: codedPassword,
        role: "user",
        date: isoDate
    },
    {
        firstName: "Eddy",
        lastName: "Rodriguez",
        email: "eddy72@hotmail.com",
        password: codedPassword,
        role: "user",
        date: isoDate
    },
    {
        firstName: "Luis",
        lastName: "Viera",
        email: "admin@truepower.com",
        password: codedPassword,
        role: "manager",
        date: isoDate
    }
];

//project collection seeds
const projectSeed = [
    {
        name: "La Petite Muse Hotel",
        location: "4210 E Collins Ave, Miami Beach, FL",
        contractor: "Atlantic Coast",
        notes: [
            {
                title: "Final inspection fixes",
                content: "Rooms without shower barrier to the GFI: 214, 208, 206"
            },
            {
                title: "Alarm supervision fault",
                content: "The backflow valve #1 is reporting a false position."
            }
        ],
        panels: [
            {
                name: "K",
                location: "Kitchen, ground floor",
                circuits: [
                    {
                        ckt: 1,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 2,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 3,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 4,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 5,
                        description: "Blender",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 6,
                        description: "Freezer",
                        breaker: {poles: 2, amps: 20}
                    }
                ]
            }
        ]
    },
    {
        name: "Surf Club 803",
        location: "90 ST Collins Ave, Surf Club South Tower",
        contractor: "TrandWorld",
        notes: [
            {
                title: "Thea's office pendant",
                content: "Pendants are LED low voltage. Waiting for them to arrive."
            }
        ],
        panels: [
            {
                name: "Main",
                location: "Staff room, behind the cabinet in front of TV",
                circuits: [
                    {
                        ckt: 1,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 2,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 3,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 4,
                        description: "General appliance",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 5,
                        description: "Blender",
                        breaker: {poles: 1, amps: 20}
                    },
                    {
                        ckt: 6,
                        description: "Freezer",
                        breaker: {poles: 2, amps: 20}
                    }
                ]
            }
        ]
    }        
]

//Contractors collection seeds

contractorSeed = [
    {
        name: "Coble Builders",
        address: "Coble road 4600",
        contacts: [
            {
                fullName: "John",
                phoneNo: "3053331234"
            },
            {
                fullName: "Christie",
                phoneNo: "7862229876"
            },
            {
                fullName: "Omar",
                phoneNo: "3057775678"
            }
        ]
    },
    {
        name: "Atlantic Coast",
        address: "Atlantic Dr. 8200",
        contacts: [
            {
                fullName: "Albert",
                phoneNo: "3051112345"
            },
            {
                fullName: "Many",
                phoneNo: "7865552345"
            }
        ]
    }
]

//Parking tickets collection seeds

parkingSeed = [
    {
        userId: "",
        tickets: [
            {
                date: isoDate,
                jobSite: "St. Regis 2500",
                amount: 16.00,
                probe: "../public/img/parking_tickets/ticket001.png"
            },
            {
                date: isoDate,
                jobSite: "Surf Club 803",
                amount: 16.00,
                probe: "../public/img/parking_tickets/ticket001.png"
            },
            {
                date: isoDate,
                jobSite: "La Petite Muse Hotel",
                amount: 12.00,
                probe: "../public/img/parking_tickets/ticket001.png"
            }
        ]
    },
    {
        userId: "",
        tickets: [
            {
                date: isoDate,
                jobSite: "St. Regis 2500",
                amount: 16.00,
                probe: "../public/img/parking_tickets/ticket001.png"
            },
            {
                date: isoDate,
                jobSite: "Golden Beach",
                amount: 16.00,
                probe: "../public/img/parking_tickets/ticket001.png"
            },
            {
                date: isoDate,
                jobSite: "Continuum 701",
                amount: 18.00,
                probe: "../public/img/parking_tickets/ticket001.png"
            }
        ] 
    }
]


function populateUser() {
    console.log('Inserting users...');
    db.User
        .deleteMany({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(data => {
            console.log( "=> " + data.result.n + " user records inserted!");
            populateContractor();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });

}

function populateContractor() {
    console.log('Inserting contractors...');
    db.Contractor
        .deleteMany({})
        .then( () => db.Contractor.collection.insertMany(contractorSeed) )
        .then( data => {
            console.log( "=> " + data.result.n + " contractor records inserted!");
            populateProject();            
        } )
        .catch( function(err) {
            console.error(err);
            process.exit(1);
        });
}

function populateProject() {
    console.log('Inserting projects...');
    db.Project
        .deleteMany({})
        .then( () => db.Project.collection.insertMany(projectSeed) )
        .then( data => {
            console.log( "=> " + data.result.n + " project records inserted!");
            populateParking();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

function populateParking() {
    console.log('Inserting parking tickets...');
    db.Parking
        .deleteMany({})
        .then(() => {
            db.User.find({}, function(err, doc) {
                parkingSeed[0].userId = doc[0]._id;
                parkingSeed[1].userId = doc[1]._id;

                db.Parking.collection.insertMany(parkingSeed)
                    .then(data => {
                        console.log( "=> " + data.result.n + " parking records inserted!");
                        process.exit(0);
                    })
            })
        })
        .catch(errm=> {
            console.error(err);
            process.exit(1);
        });
}

//------------------------------------------------------


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ECMT", {useNewUrlParser: true} )
    .then( () => { 
        populateUser();
    },
    err => { 
        console.log('Error connection to MongoDB \n' + error);
    }
);