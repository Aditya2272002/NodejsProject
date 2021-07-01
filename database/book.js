/*
    Step 1 --> import mongoose
    Step 2 --> Create Schema
    Step 3 --> Create Document Model
    Step 4 --> Use them
*/

const mongoose = require("mongoose");

//Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publications: [Number],
    category: [String],
});


//Create book Model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;