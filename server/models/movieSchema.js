const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
})

const Movie = model("Movie", movieSchema, "Movies");
console.log("🧾 Collection name used by Mongoose:", Movie.collection.name);

module.exports = Movie;