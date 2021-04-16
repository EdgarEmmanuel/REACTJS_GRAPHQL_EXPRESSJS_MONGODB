const express = require("express");
const body_parser = require("body-parser");
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cors = require("cors");
var mongoose = require("mongoose");
var app = express();
app.use(body_parser.json());

// let corsOptions={
//     origin:"http://localhost:3000"
// }

app.use(cors());

const schemaGRAPHQL = require("./graphql/schema/index").schema;
const resolverGRAPHQL = require("./graphql/resolvers/index");


//connect to the database
mongoose.connect("mongodb://localhost:27017/graphqlBd",{useNewUrlParser:true,useUnifiedTopology: true });

app.use("/graphql", graphqlHTTP({
        schema:schemaGRAPHQL,
        rootValue:resolverGRAPHQL,
        graphiql:true
    }
));


app.listen(8000,()=>{console.log("running on port 8000")});