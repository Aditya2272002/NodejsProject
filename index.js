require("dotenv").config(); // for hiding our sensitive data we use dotenv


const express = require("express"); // importing express
const mongoose = require("mongoose"); // importing mongoose

//MicroServices Routes
const Books = require("./API/Book/Book");
const Authors = require("./API/Book/Author");
const Publications = require("./API/Book/Publication");


const booky = express(); // Initialization

//Configuation-> Making our app understand json form
booky.use(express.json());


//Establish database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
}
).then(() => console.log("Connection is Done!!!!"));


//Initilizing MicroServices
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications)

booky.listen(3000, () => console.log("Hey Server Running!"));