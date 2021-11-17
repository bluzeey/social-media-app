const { ApolloServer} = require('apollo-server');
const {MONGODB}=require('./config')
const mongoose=require('mongoose');
const typeDefs =require('./graphql/typedefs.js');
const resolvers=require('./graphql/resolvers');


const server=new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(MONGODB,{useNewUrlParser:true}).then(()=>{
    console.log('MongoDB connected , launch fireworks!')
    return server.listen({port:5000})
})
.then(res=>{
    console.log(`Server running at ${res.url}`)
})