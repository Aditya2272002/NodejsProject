/*
    Step 1 --> import mongoose
    Step 2 --> Create Schema
    Step 3 --> Create Document Model
    Step 4 --> Use them
*/

const mongoose = require("mongoose");

//Creating a Publication schema
const PublicationsSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});


//Create Publication Model
const PublicationsModel = mongoose.model("publications", PublicationsSchema);

module.exports = PublicationsModel;