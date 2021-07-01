require("dotenv").config(); // for hiding our sensitive data we use dotenv


const express = require("express"); // importing express
const mongoose = require("mongoose");

//database
const database = require("./database");// importing the database 

const { restart } = require("nodemon");

const booky = express(); // Initialization

//Configuation-> Making our app understand json form
booky.use(express.json());


//Establish database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        }
).then(()=> console.log("Connection is Done!!!!"));

//Api creation

/*
Route                   /
Description             Get all books
Access                  PUBLIC
Parameter               NONE
Methods                 GET
*/
booky.get("/",(req, res) => {
        //chanegs many times
        return res.json({books:database.books})
});


/*
Route                   /
Description             Get specific book based on ISBN
Access                  PUBLIC
Parameter               isbn
Methods                 GET
*/
booky.get("/is/:isbn", (req, res)=>{
        const getSpecificBook = database.books.filter((book) => 
                book.ISBN === req.params.isbn);

                if(getSpecificBook.length===0){
                        return res.json({error:`No book found for ISBN ${req.params.isbn}`});
                }
                else{
                        return  res.json({book:getSpecificBook});
                }  
});

/*
Route                   /c
Description             Get specific book based on Category
Access                  PUBLIC
Parameter               category
Methods                 GET
*/
booky.get("/c/:category",(req,res)=>{
        const getSpecificBook = database.books.filter((book)=>
        book.category.includes(req.params.category));

        if(getSpecificBook.length === 0){
                return res.json({error:`No book found with category ${req.params.category}`,});
        }
                return res.json({book:getSpecificBook});
});

/*
Route                   /l
Description             Get specific book based on Language
Access                  PUBLIC
Parameter               language
Methods                 GET
*/
booky.get("/l/:language",(req,res)=>{
        const getSpecificBook = database.books.filter((book)=>
        book.language === req.params.language);

        if(getSpecificBook.length === 0){
                return res.json({error:`No book of ${req.params.language} language`,})
        }
        return res.json({book:getSpecificBook});
});


/*
Route                   /author
Description             Get all authors
Access                  PUBLIC
Parameter               NONE
Methods                 GET
*/
booky.get("/author",(req,res)=>{
        return res.json({authors:database.author});
});

/*
Route                   /author
Description             Get author based upon id
Access                  PUBLIC
Parameter               aid
Methods                 GET
*/
booky.get("/author/:aid",(req,res)=>{
        const getSpecificAuthor = database.author.filter((author)=>
        author.id === parseInt(req.params.aid));

        if(getSpecificAuthor.length === 0){
                return res.json({error:`No author found with id ${req.params.aid}`});
        }
        return res.json({authors:getSpecificAuthor});
});

/*
Route                   /author/book
Description             Get author based upon id
Access                  PUBLIC
Parameter               bookisbn
Methods                 GET
*/
booky.get("/author/book/:bookisbn",(req,res)=>{
        const getAuthor = database.author.filter((author) =>
        author.books.includes(req.params.bookisbn));   
        
        if(getAuthor.length === 0){
                return res.json({error:`No author with book isbn ${req.params.bookisbn}`});
        }
        else{
                return res.json({author:getAuthor});
        }
});

/*
Route                   /p/pub
Description             Getting all Publication 
Access                  PUBLIC
Parameter               NONE
Methods                 GET
*/
booky.get("/p/pub",(req,res)=>{
        return res.json({publications:database.publications});
});

/*
Route                   /p
Description             Getting Publication based upon id  
Access                  PUBLIC
Parameter               pubid
Methods                 GET
*/
booky.get("/p/:pubid",(req,res)=>{
        const getPub = database.publications.filter((pub)=>
        pub.id === parseInt(req.params.pubid));

        if(getPub.length === 0){
                return res.json({erro:`No publication for ${req.json.pubid}`});
        }
        return res.json({publications:getPub});
});

/*
Route                   /p/pubBook
Description             Getting Publication based upon book
Access                  PUBLIC
Parameter               bookisbn
Methods                 GET
*/
booky.get("/p/pubBook/:bookisbn",(req,res)=>{
        const getPub = database.publications.filter((pub)=>
        pub.books.includes(req.params.bookisbn));

        if(getPub.length === 0){
                return res.json({error:`${req.params.bookisbn} book don't have any publications`});
        }
        return res.json({publications:getPub});
});


/*
Route                   /book/add
Description             Adding a new book
Access                  PUBLIC
Parameter               NONE
Methods                 POST
*/
booky.post("/book/add",(req,res)=>{
        const {newBook} = req.body;
        database.books.push(newBook);
        return res.json({books:database.books});
});

/*
Route                   /author/add
Description             Adding a new Author
Access                  PUBLIC
Parameter               NONE
Methods                 POST
*/
booky.post("/author/add",(req,res)=>{
        const {newAuthor} = req.body;
        database.author.push(newAuthor);
        return res.json({author:database.author});
});

/*
Route                   /publications/add
Description             Adding a new Publication
Access                  PUBLIC
Parameter               NONE
Methods                 POST
*/
booky.post("/publications/add",(req,res)=>{
        const {newPub} = req.body;
        database.publications.push(newPub);
        return res.json({publications:database.publications});
});

/*
Route                   /book/update/title
Description             to update(put) book title
Access                  PUBLIC
Parameter               isbn
Methods                 PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
        database.books.forEach((book)=>{
                if(book.ISBN === req.params.isbn){
                        book.title = req.body.newBookTitle;
                        return;
                }
        });
        return res.json({book:database.books});
});

/*
Route                   /book/update/author
Description             to update(put) book author
Access                  PUBLIC
Parameter               isbn,authorId
Methods                 PUT
*/
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
        database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
                return book.author.push(parseInt(req.params.authorId));
        }
        });

        database.author.forEach((author) =>{
                if(author.id === parseInt(req.params.authorId)){
                return author.books.push(req.params.isbn);
                }
        });
        return res.json({books:database.books,author:database.author});
});

/*
Route                   /author/update/name
Description             to update(put) author name
Access                  PUBLIC
Parameter               authorId
Methods                 PUT
*/
booky.put("/author/update/name/:authorId",(req,res)=>{
        database.author.forEach((author) =>{
                if(author.id === parseInt(req.params.authorId)){
                        author.name = req.body.newAuthorName;
                        return; 
                }
        });
        return res.json({author:database.author});
});


/*
Route                   /publication/update/name
Description             to update(put) publication name
Access                  PUBLIC
Parameter               publicationId
Methods                 PUT
*/
booky.put("/publication/update/name/:publicationId",(req,res)=>{
        database.publications.forEach((publication)=>{
                if(publication.id === parseInt(req.params.publicationId)){
                        publication.name = req.body.newPublicationName;
                        return;
                }
        });
        return res.json({publication:database.publications});
});

/*
Route                   /publication/add/book
Description             to add a book to publication 
Access                  PUBLIC
Parameter               publicationId,isbn 
Methods                 PUT
*/
booky.put("/publication/add/book/:publicationId/:isbn",(req,res)=>{

        database.publications.forEach((pub)=>{
                if(pub.id === parseInt(req.params.publicationId)){
                       return pub.books.push(req.params.isbn);
                }
        });

        database.books.forEach((book)=>{
                if(book.ISBN === req.params.isbn){
                        return book.publications.push(parseInt(req.params.publicationId));
                }
        });

        return res.json({books:database.books,publications:database.publications});
});

//To delete something, we have to make our database objects of type 'let' form 'const' :-
/*
Route                   /book/delete
Description             to delete a book  
Access                  PUBLIC
Parameter               isbn 
Methods                 DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
        const updatedBookDatabase = database.books.filter((book)=>
                book.ISBN !== req.params.isbn
        );
        database.books = updatedBookDatabase;
        return res.json({books: database.books});
});

/*
Route                   /book/delete/author
Description             to delete a author from a book  
Access                  PUBLIC
Parameter               isbn, authorId
Methods                 DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
        database.books.forEach((book)=>{
                if(book.ISBN === req.params.isbn){
                       const updatedBookDatabaseAuthor= book.author.filter((authors)=>
                                authors !== parseInt(req.params.authorId)
                       );
                       book.author = updatedBookDatabaseAuthor;
                       return;
                }
        });

        database.author.forEach((authors)=>{
                if(authors.id === parseInt(req.params.authorId)){
                        const updatedAuthorDatabasebooks = authors.books.filter((book)=>
                                book !== req.params.isbn
                        );
                        authors.books = updatedAuthorDatabasebooks;
                        return;
                }
        });
        return res.json({book:database.books, authors:database.author});
});

/*
Route                   /author/delete
Description             to delete an author 
Access                  PUBLIC
Parameter               authorId
Methods                 DELETE
*/
booky.delete("/author/delete/:authorId",(req,res)=>{
        const updatedAuthor = database.author.filter((authors)=>
                authors.id !== parseInt(req.params.authorId)
        );
        database.author = updatedAuthor;
        return res.json({authors:database.author});
});


/*
Route                   /publication/delete/book
Description             to delete a book from publication 
Access                  PUBLIC
Parameter               publicationId ,isbn
Methods                 DELETE1
*/
booky.delete("/publication/delete/book/:publicationId/:isbn",(req,res)=>{
        database.publications.forEach((publication)=>{
                if(publication.id === parseInt(req.params.publicationId)){
                       const updatedBookPub =  publication.books.filter((book)=>
                                book !== req.params.isbn
                        );
                        publication.books = updatedBookPub;
                        return;
                }
        });
        return res.json({publications:database.publications});
});

booky.listen(3000,() => console.log("Hey Server Running!"));







