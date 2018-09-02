var {graphql, buildSchema} = require('graphql');
let app = require("express")();
var graphqlHTTP = require('express-graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return Promise.resolve('Hello world!');
    }
};

app.get("/getName", function (req, res) {
    // Run the GraphQL query '{ hello }' and print out the response
    graphql(schema, '{ hello }', root).then((response) => {
        console.log(response);
        res.send(response);
    });
});

app.post('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

let server = app.listen(3000, function () {
    console.log("Server is started at on port " + server.address().port);
});
