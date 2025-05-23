const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt, GraphQLList
} = require("graphql/type");

const movies = [
  {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '4',},
  {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '3',},
  {id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '2',},
  {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '1',},
  {id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '4'},
  {id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '4'},
  {id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '4'},
  {id: '7', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '1'},
];

const directors = [
  {id: '1', name: 'Guy Ritchie', age: 50},
  {id: '2', name: 'James McTeigue', age: 51},
  {id: "3", name: 'Michael Radford', age: 72},
  {id: "4", name: 'Quentin Tarantino', age: 55},
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    director: {
      type: DirectorType,
      resolve(parent, args, context) {
        return directors.find(d => d.id === parent.directorId);
      }
    },
  })
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args, context) {
        return movies.filter(m => m.directorId === parent.id)
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
        return movies.find(m => m.id === args.id);
      }
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args, context, info) => {
        return directors.find(d => d.id === args.id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async (parent, args, context, info) => {
        return movies
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: async (parent, args, context, info) => {
        return directors
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: Query,
})