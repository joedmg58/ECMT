var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contractorSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    contacts: [{
        fullName: String,
        phoneNo: String
    }]
});

var Contractor = mongoose.model("Contractor", contractorSchema);

module.exports = Contractor;