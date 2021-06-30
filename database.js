let books = [
    {
    ISBN: "12345BOOK1",
    title: "Wings of Fire",
    pubDate: "2021-07-02",
    language: "en",
    numPage: 250,
    author: [1 , 2],
    publications: [1],
    category: ["tech","programming","horror","thriller"],
    },
    {
        ISBN: "12345BOOK2",
        title: "SpaceX",
        pubDate: "2021-07-12",
        language: "en",
        numPage: 300,
        author: [2],
        publications: [1],
        category: ["tech","programming","horror","thriller"],
    },
    {
        ISBN: "MyBook",
        title: "Tintin",
        pubDate: "2021-07-02",
        language: "en",
        numPage: 250,
        author: [1 , 2],
        publications: [1,2],
        category: ["tech","programming","horror","thriller"],
    }

];

let author = [
    {
    id: 1,
    name: "Aditya",
    books: ["12345BOOK1"],
    },
    {
        id: 2,
        name: "Mohan",
        books: ["12345BOOK1", "1234BOOK2"],
    },
];

const publications = [
    {
        id: 1,
        name:"writeX",
        books: ["12345BOOK1"],
    },

    {
        id: 2,
        name:"ReadX",
        books: ["12345BOOK2"],
    },

    {
        id:20,
        name:"Boss",
        books:["12345BOOK2","12345BOOK1"],
    },

];

module.exports = {books,author,publications};// To export our file to any other place