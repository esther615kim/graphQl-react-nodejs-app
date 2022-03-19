const graphql = require('graphql');
const _ = require('lodash');
const Author = require('../models/author'); // model
const Book = require('../models/book'); // model


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//dummy
// const books = [
//     { name: "chuchu's every day", genre: "Fantasy", id: "1", authorId: '1' },
//     { name: "chuchu's dreams", genre: "Fantasy", id: "2", authorId: '2' },
// ]

// const authors = [
//     { name: "Tommie C", age: 34, id: "1" },
//     { name: "Mr.Chuchu", age: 9, id: "2" },
//     { name: "Tommie C", age: 34, id: "3" },
// ]

// first object type =>single book
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { // author obj
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return Author.findById(parent.authorId);
                // return _.find(authors, { id: parent.authorId })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },// integer
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id }) // book that has parent.id!
            }
        }
    })
})
// root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        //single book
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id);

            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data 
                return Author.findById(args.id);
            }
        },
        // query for enlisting books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // no need to search for books just return all books
                return Book.find({});
            }
        },
        // queryfor enlisting all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return all authors
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                // make a new instance 
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                // make a new instance 
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery, // root
    mutation: Mutation
});

