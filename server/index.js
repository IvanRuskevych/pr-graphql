const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');
const {connect, connection} = require('mongoose');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3005;

// Якщо потрібно підписатися на кілька станів підключення (connected, disconnected, reconnected)
// або для дебагу або логування в процесі розробки
connect(process.env.MONGODB_URI);
const dbConnection = connection;
dbConnection.on('error', err => console.error('❌ Connection error:', err));
dbConnection.once('open', () => console.log('✅ MongoDB connected'));

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}))

// Server connection
app.listen(PORT, (err) => {
  err ? console.error(`❌ Server error ${err}`) : console.log(`✅ Server started on port ${PORT}`)
});
