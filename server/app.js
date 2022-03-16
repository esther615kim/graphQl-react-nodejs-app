const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const mongoose = require('mongoose');

const app = express();

// connect to mlab database
mongoose.connect('mongodb+srv://myproject:street2133@cluster0.nwerd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log("connected to db")
});

app.use('/graphql', graphqlHTTP({
  // add options to handle graphql requests
  schema,
  // rootValue: root,
  graphiql: true,
}));


app.listen(4000, () => {
  console.log("listening on port 4000")
});