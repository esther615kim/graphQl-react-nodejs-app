const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

// first object type =>single book
const Booktype = new GraphQLObjectType({
    name:"Book",
    fields:()=>{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
    }
})
// root query
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        //single book
        book:{
        type:Booktype,
        args:{id:{type:GraphQLString}},
        resolve(parent,args){ 
            // args.id
        }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery // root
})