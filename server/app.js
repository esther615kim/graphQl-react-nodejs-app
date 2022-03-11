const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const app = express();


app.use('/graphql', graphqlHTTP({
    // add options to handle graphql requests
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  app.


app.listen(4000,()=>{
    console.log("listening on port 4000")
})