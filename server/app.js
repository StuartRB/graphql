const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();
const schema = require('./schema/schema')
const cors = require('cors');

//allow cross origin requests
app.use(cors());

//Stuart
//L2e0kY94G7fys2SV
//mongodb+srv://stuart:<password>@graphql-db-5bwnz.mongodb.net/test?retryWrites=true&w=majority


mongoose.connect('mongodb+srv://stuart:L2e0kY94G7fys2SV@graphql-db-5bwnz.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () =>{
	console.log("Connected to database");
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))

app.listen(4000, ()=> {
	console.log("ADAM HALE STOLE MY ALE! :  4000");
})