var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String },
    contractor: { type: String },
    notes: [{
        title: { type: String, required: true }, 
        content: String, 
        date: {type: Date, default: Date.now} 
        }],
    panels: [{
        name: { type: String, required: true },
        location: String,
        circuits: [{
            number: Number,
            description: String,
            breaker: [{
                poles: Number,
                amps: Number
            }]
        }]
    }]
});

var User = mongoose.model("Project", projectSchema);

module.exports = Project;