const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql/type");

const MoviesModel = require("../models/movieSchema");
const DirectorsModel = require("../models/directorSchema");

const MovieType = new GraphQLObjectType({
  name: "movie",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: new GraphQLNonNull(GraphQLString)},
    genre: {type: new GraphQLNonNull(GraphQLString)},
    director: {
      type: DirectorType,
      resolve(parent, args, context) {
        // return directors.find(d => d.id === parent.directorId);
        return DirectorsModel.findById(parent.directorId)
      }
    },
  })
})

const DirectorType = new GraphQLObjectType({
  name: "director",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: new GraphQLNonNull(GraphQLString)},
    age: {type: new GraphQLNonNull(GraphQLInt)},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args, context) {
        // return movies.filter(m => m.directorId === parent.id)
        return MoviesModel.find({directorId: parent.id})
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
        return MoviesModel.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {
        // return directors.find(d => d.id === args.id);
        return DirectorsModel.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async (parent, args, context, info) => {
        // return movies
        return MoviesModel.find({})
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: async (parent, args, context, info) => {
        // return directors
        return DirectorsModel.find({})
      }
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: async (parent, args, context, info) => {
        const newDirector = new DirectorsModel({
          name: args.name,
          age: args.age,
        })

        return await newDirector.save()
      }
    },

    addMovie: {
      type: MovieType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        directorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: async (parent, args, context, info) => {
        const newMovie = new MoviesModel({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId, // TODO: Тимчасово, пізніше автоматизуємо
        })

        return await newMovie.save()
      }
    },

    removeDirector: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {
        return await DirectorsModel.findByIdAndDelete(args.id)
      }
    },

    removeMovie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {
        return await MoviesModel.findByIdAndDelete(args.id)
      }
    },

    updateDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: async (parent, args, context, info) => {
        return await DirectorsModel.findByIdAndUpdate(args.id, {
            $set: {
              name: args.name,
              age: args.age
            }
          },
          {new: true}
        )
      }
    },

    updateMovie: {
      type: MovieType,
      args: {
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        directorId: {type: GraphQLID},
      },
      resolve: async (parent, args, context, info) => {
        return await MoviesModel.findByIdAndUpdate(args.id, {
            $set: {
              name: args.name,
              genre: args.genre,
              directorId: args.directorId,
            }
          },
          {new: true}
        )
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})