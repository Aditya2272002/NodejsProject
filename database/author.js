/*
    Step 1 --> import mongoose
    Step 2 --> Create Schema
    Step 3 --> Create Document Model
    Step 4 --> Use them
*/

const mongoose = require("mongoose");

//Creating a author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});


//Create author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;