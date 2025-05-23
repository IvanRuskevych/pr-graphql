const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt, GraphQLList
} = require("graphql/type");

const MoviesSchema = require("../models/movieSchema");
const DirectorsSchema = require("../models/directorSchema");

const MovieType = new GraphQLObjectType({
  name: "movie",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    director: {
      type: DirectorType,
      resolve(parent, args, context) {
        // return directors.find(d => d.id === parent.directorId);
        return DirectorsSchema.findById(parent.directorId)
      }
    },
  })
})

const DirectorType = new GraphQLObjectType({
  name: "director",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args, context) {
        // return movies.filter(m => m.directorId === parent.id)
        return MoviesSchema.find({directorId: parent.id})
      }
    },
  })
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {
        // return movies.find(m => m.id === args.id);
        return MoviesSchema.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {
        // return directors.find(d => d.id === args.id);
        console.log("🎯 directorId in parent:", parent.directorId);
        console.log("🎯 argsId in parent:", args.id);
        return DirectorsSchema.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async (parent, args, context, info) => {
        // return movies
        return MoviesSchema.find({})
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: async (parent, args, context, info) => {
        // return directors
        return DirectorsSchema.find({})
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: Query,
})