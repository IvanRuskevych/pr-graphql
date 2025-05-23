const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = require("graphql/type");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  })
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {

      }
    },
  })
})

module.exports = new GraphQLSchema({
  query: Query,
})