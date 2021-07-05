//Prefix:  /author

// Intializing Express Router
const Router = require("express").Router();


//DataBase Model
const AuthorModels = require("../../../database/author")



/*
Route                   /author
Description             Get all authors
Access                  PUBLIC
Parameter               NONE
Methods                 GET
*/

Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModels.find()
    return res.json({ authors: getAllAuthors });
});

/*
Route                   /author
Description             Get author based upon id
Access                  PUBLIC
Parameter               aid
Methods                 GET
*/
Router.get("/:aid", async (req, res) => {
    const getSpecificAuthor = AuthorModels.findOne({
            author: req.params.aid
    });
    if (!getSpecificAuthor) {
            return res.json({ error: `No author found with id ${req.params.aid}` });
    }
    return res.json({ authors: getSpecificAuthor });
});


/*
Route                   /author/book
Description             to get list of authors based on books
Access                  PUBLIC
Parameter               bookisbn
Methods                 GET
*/

Router.get("/book/:bookisbn", async (req, res) => {
    const getAuthor = await AuthorModels.find({
            authors: req.params.bookisbn
    });

    if (!getAuthor) {
            return res.json({ error: `No author with book isbn ${req.params.bookisbn}` });
    }
    else {
            return res.json({ author: getAuthor });
    }
});


/*
Route                   /author/add
Description             Adding a new Author
Access                  PUBLIC
Parameter               NONE
Methods                 POST
*/
Router.post("/add", async (req, res) => {
    const { newAuthor } = req.body;
    const newAddAuthor = await AuthorModels.create(newAuthor);
    return res.json({ author: newAddAuthor, message: "Author Added!" });
});


/*
Route                   /author/update/name
Description             to update(put) author name
Access                  PUBLIC
Parameter               authorId
Methods                 PUT
*/
Router.put("/update/name/:authorId", (req, res) => {
    database.author.forEach((author) => {
            if (author.id === parseInt(req.params.authorId)) {
                    author.name = req.body.newAuthorName;
                    return;
            }
    });
    return res.json({ author: database.author });
});


/*
Route                   /author/delete
Description             to delete an author 
Access                  PUBLIC
Parameter               authorId
Methods                 DELETE
*/
Router.delete("/delete/:authorId", (req, res) => {
    const updatedAuthor = database.author.filter((authors) =>
            authors.id !== parseInt(req.params.authorId)
    );
    database.author = updatedAuthor;
    return res.json({ authors: database.author });
});

module.exports = Router;