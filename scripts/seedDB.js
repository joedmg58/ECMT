const mongoose = require('mongoose');
const db = require('../models');

const crypto = require('crypto');
const hash = crypto.createHash('sha-256');

const password = 'password';
hash.update( password );
codedPassword = hash.digest('hex');


//user collection seeds
const userSeed = [
    {
        firstname: "Joed",
        lastname: "Machado",
        email: "joedmg58@gmail.com",
        password: codedPassword,
        role: "user"
    },
    {
        firstname: "Luis",
        lastname: "Viera",
        email: "admin@truepower.com",
        password: codedPassword,
        role: "manager"
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

//Evaluation collection seeds
const evalSeed = [
    {
        userId: null,
        surveyName: "JS",
        answers: [0, 0, 1],
        points: 100
    },
    {
        userId: null,
        surveyName: "CSS",
        answers: [2, 1, 3],
        points: 100
    },
    {
        userId: null,
        surveyName: "HTML",
        answers: [0, 2, 3],
        points: 66.66
    },
    {
        userId: null,
        surveyName: "HTML",
        answers: [0, 2, 0],
        points: 100
    },
    {
        userId: null,
        surveyName: "HTML",
        answers: [0, 2, 0],
        points: 100
    }
];

function populateUser() {
    console.log('Inserting users...');
    db.User
        .remove({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(data => {
            console.log(data.result.n + " user records inserted!");
            populateSurvey();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });

}

function populateSurvey() {
    console.log('inserting surveys...')
    db.Survey
        .remove({})
        .then(() => db.Survey.collection.insertMany(surveySeed))
        .then(data => {
            console.log(data.result.n + " survey records inserted!");
            populateEvaluation();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

function populateEvaluation() {
    console.log('inserting evaluations...');
    db.Evaluation
        .remove({})
        //.then(() => db.Evaluation.collection.insertMany(evalSeed))
        .then(() => {
            db.User.find({}, function (err, doc) {
                evalSeed[0].userId = doc[2]._id;
                evalSeed[1].userId = doc[1]._id;
                evalSeed[2].userId = doc[0]._id;
                evalSeed[3].userId = doc[1]._id;
                evalSeed[4].userId = doc[3]._id;

                db.Evaluation.collection.insertMany(evalSeed)
                    .then(data => {
                        console.log(data.result.n + " evaluation records inserted!");
                        process.exit(0);
                    })
            })
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}




mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ECMT").then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        populateUser();
    },
    err => { /** handle initial connection error */
        console.log('Error connection to MongoDB \n' + error);
    }
);