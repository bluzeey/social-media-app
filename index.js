const { ApolloServer} = require('apollo-server');
const mongoose=require('mongoose');
const Post=require('./models/post.js')
import { typeDefs } from './graphql/typedefs.js';
import { resolvers } from './graphql/resolvers';


const server=new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect('mongodb+srv://sahilm:sahilm123@app-database.dfcxh.mongodb.net/mergn?retryWrites=true&w=majority',{useNewUrlParser:true}).then(()=>{
    console.log('MongoDB connected , launch fireworks!')
    return server.listen({port:5000})
})
.then(res=>{
    console.log(`Server running at ${res.url}`)
})