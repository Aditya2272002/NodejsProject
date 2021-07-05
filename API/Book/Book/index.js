//Prefix :  /book


const Router = require("express").Router(); // Intializing Express Router

//DataBase Model
const BookModel = require("../../../database/book");




/*
Route                   /
Description             Get all books
Access                  PUBLIC
Parameter               NONE
Methods                 GET
*/

Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
Route                   /
Description             Get specific book based on ISBN
Access                  PUBLIC
Parameter               isbn
Methods                 GET
*/

Router.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn })
    if (!getSpecificBook) {
            return res.json({ error: `No book found for ISBN ${req.params.isbn}` });
    }
    else {
            return res.json({ book: getSpecificBook });
    }
});

/*
Route                   /c
Description             Get specific book based on Category
Access                  PUBLIC
Parameter               category
Methods                 GET
*/

Router.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
            category: req.params.category
    });
    if (!getSpecificBook) {
            return res.json({ error: `No book found with category ${req.params.category}`, });
    }
    return res.json({ book: getSpecificBook });
});
/*
Route                   /l
Description             Get specific book based on Language
Access                  PUBLIC
Parameter               language
Methods                 GET
*/

Router.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
            language: req.params.language
    });

    if (!getSpecificBook) {
            return res.json({ error: `No book of ${req.params.language} language`, })
    }
    return res.json({ book: getSpecificBook });
});

/*
Route                   /book/add
Description             Adding a new book
Access                  PUBLIC
Parameter               NONE
Methods                 POST
*/

Router.post("/add", async (req, res) => {
    const { newBook } = req.body;
    const newAddBook = await BookModel.create(newBook);
    return res.json({ books: newAddBook, message: "Books Added!" });
});

/*
Route                   /book/update/title
Description             to update(put) book title
Access                  PUBLIC
Parameter               isbn
Methods                 PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {
    const updatedBook = await BookModels.findOneAndUpdate(
            {
                    ISBN: req.params.isbn,
            },
            {
                    title: req.body.bookTitle,
            },
            {
                    new: true, // to get Updated data everyTime
            }
    );
    return res.json({ book: updatedBook });
});



/*
Route                   /book/update/author
Description             to update(put) book author
Access                  PUBLIC
Parameter               isbn,authorId
Methods                 PUT
*/

Router.put("/update/author/:isbn/:authorId", async (req, res) => {
    const updatedBookAuthor = await BookModel.findOneAndUpdate(
            {
                    ISBN: req.params.isbn
            },
            {
                    $push: {
                            author: req.params.authorId,
                    }
            },
            {
                    new:true,
            }
    );

   const updatedAuthor = await AuthorModels.findOneAndUpdate(
           {
                    id: req.params.authorId
           },
           {
                    $push:{
                            books:req.params.isbn
                    }
           },
           {
                   new:true
           }
   );
    return res.json({ books:updatedBookAuthor , author:updatedAuthor });
});


/*
Route                   /book/delete
Description             to delete a book  
Access                  PUBLIC
Parameter               isbn 
Methods                 DELETE
*/
Router.delete("/delete/:isbn", async(req, res) => {
    const updateBook = await BookModel.findOneAndDelete(
            {
                    ISBN:req.params.isbn
            }
    );
    return res.json({ books: updateBook });
});

/*
Route                   /book/delete/author
Description             to delete a author from a book  
Access                  PUBLIC
Parameter               isbn, authorId
Methods                 DELETE
*/

Router.delete("/delete/author/:isbn/:authorId", async(req, res) => {
    const getUpdatedBook = await BookModel.findOneAndUpdate(   
            {
                    ISBN:req.params.isbn,
            },
            {
                    $pull:{
                            author :parseInt(req.params.authorId),
                    }
            },
            {
                    new :true
            }
    );

    const getUpdatedAuthor = await AuthorModels.findOneAndUpdate(
            {
                   id:parseInt(req.params.authorId) ,
            },
            {
                   $pull:{
                           books : req.params.isbn,
                   } 
            },
            {
                    new :true
            }
    );     
    return res.json({ book: getUpdatedBook, authors: getUpdatedAuthor });
});




module.exports = Router;