const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/graphql", graphqlHTTP({}))

app.listen(PORT, (err) => {
  err ? console.error(err) : console.log(`Server started on port ${PORT}`)
});
