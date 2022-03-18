const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const mongoose = require('mongoose');

const app = express();

// connect to mlab database
const connectDB = async () => {
  try {
    const connected = await mongoose.connect("mongodb+srv://admin:street2133@cluster0.kfw0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    console.log("db connected");

  } catch (error) {
    console.log(error.message);
    process.exit(1); // excit the process when failed
  }
}

connectDB();

app.use('/graphql', graphqlHTTP({
  // add options to handle graphql requests
  schema,
  // rootValue: root,
  graphiql: true,
}));



app.listen(4000, () => {
  console.log("listening on port 4000")
});