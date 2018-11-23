var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parkingSchema = new Schema({
    userId: String,
    tickets: [{
        date: Date,
        jobSite: String,
        amount: Number,
        probe: String //that will be the path to picture of the ticket
    }]
});

var Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;