const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const axios = require("axios");

const personalType = new GraphQLObjectType({
  name: "Personal",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    personal: {
      type: personalType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/personals/${args.id}`)
          .then((res) => res.data);
      },
    },
    personals: {
      type: new GraphQLList(personalType),
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/personals`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
