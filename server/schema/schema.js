const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt} = graphql;

//dummy
const books =[
    {name:"chuchu's every day", genre:"Fantasy", id:"1"},
    {name:"chuchu's dreams", genre:"Fantasy", id:"2"},
]

const authors = [
    {name:"Tommie C", age:34, id:"1"},
    {name:"Mr.Chuchu", age:9, id:"2"},
    {name:"Tommie C", age:34, id:"3"},
]

// first object type =>single book
const BookType = new GraphQLObjectType({
    name:"Book",
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type:GraphQLInt } // integer
    })
})
// root query
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        //single book
        book:{
        type:BookType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){ 
            // code to get data 
            return _.find(books, { id: args.id });
        }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){ 
                // code to get data 
                return _.find(authors, { id: args.id });
            }
            }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery // root
})