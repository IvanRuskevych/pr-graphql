const {Schema, model} = require('mongoose')

const directorSchema = new Schema({
  name: String,
  age: Number,
})

const Director = model("Director", directorSchema, "Directors");
console.log("🧾 Collection name used by Mongoose:", Director.collection.name);

module.exports = Director;