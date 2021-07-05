//Prefix:   /publication

const Router = require("express").Router();


const PublicationsModels = require("../../../database/publications");




/*
Route                   /p/pub
Description             Getting all Publication 
Access                  PUBLIC
Parameter               NONE
Methods                 GET
*/
Router.get("/", (req, res) => {
    return res.json({ publications: database.publications });
});

/*
Route                   /p
Description             Getting Publication based upon id  
Access                  PUBLIC
Parameter               pubid
Methods                 GET
*/
Router.get("/:pubid", (req, res) => {
    const getPub = database.publications.filter((pub) =>
            pub.id === parseInt(req.params.pubid));

    if (getPub.length === 0) {
            return res.json({ erro: `No publication for ${req.json.pubid}` });
    }
    return res.json({ publications: getPub });
});

/*
Route                   /p/pubBook
Description             Getting Publication based upon book
Access                  PUBLIC
Parameter               bookisbn
Methods                 GET
*/
Router.get("/pubBook/:bookisbn", (req, res) => {
    const getPub = database.publications.filter((pub) =>
            pub.books.includes(req.params.bookisbn));

    if (getPub.length === 0) {
            return res.json({ error: `${req.params.bookisbn} book don't have any publications` });
    }
    return res.json({ publications: getPub });
});





/*
Route                   /publications/add
Description             Adding a new Publication
Access                  PUBLIC
Parameter               NONE
Methods                 POST
*/
Router.post("/add", async (req, res) => {
    const { newPub } = req.body;
    const addNewPub = await PublicationsModels.create(newPub);
    return res.json({ publications: addNewPub, message: "Publication added!" });
});


/*
Route                   /publication/update/name
Description             to update(put) publication name
Access                  PUBLIC
Parameter               publicationId
Methods                 PUT
*/
Router.put("/update/name/:publicationId", (req, res) => {
    database.publications.forEach((publication) => {
            if (publication.id === parseInt(req.params.publicationId)) {
                    publication.name = req.body.newPublicationName;
                    return;
            }
    });
    return res.json({ publication: database.publications });
});

/*
Route                   /publication/add/book
Description             to add a book to publication 
Access                  PUBLIC
Parameter               publicationId,isbn 
Methods                 PUT
*/
Router.put("/add/book/:publicationId/:isbn", (req, res) => {

    database.publications.forEach((pub) => {
            if (pub.id === parseInt(req.params.publicationId)) {
                    return pub.books.push(req.params.isbn);
            }
    });

    database.books.forEach((book) => {
            if (book.ISBN === req.params.isbn) {
                    return book.publications.push(parseInt(req.params.publicationId));
            }
    });

    return res.json({ books: database.books, publications: database.publications });
});




/*
Route                   /publication/delete/book
Description             to delete a book from publication 
Access                  PUBLIC
Parameter               publicationId ,isbn
Methods                 DELETE1
*/
Router.delete("/delete/book/:publicationId/:isbn", (req, res) => {
    database.publications.forEach((publication) => {
            if (publication.id === parseInt(req.params.publicationId)) {
                    const updatedBookPub = publication.books.filter((book) =>
                            book !== req.params.isbn
                    );
                    publication.books = updatedBookPub;
                    return;
            }
    });
    return res.json({ publications: database.publications });
});

module.exports = Router;