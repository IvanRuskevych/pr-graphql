const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, (err) => {
  err ? console.error(err) : console.log(`Server started on port ${PORT}`)
});
