const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./schema/schema"),
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
