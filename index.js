const { ApolloServer} = require('apollo-server');
const {MONGODB}=require('./config')
const mongoose=require('mongoose');
const typeDefs =require('./graphql/typedefs.js');
const resolvers=require('./graphql/resolvers');

const PORT=process.env.PORT ||5000
const server=new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>({req})
})

mongoose.connect(MONGODB,{useNewUrlParser:true}).then(()=>{
    console.log('MongoDB connected , launch fireworks!')
    return server.listen({port:PORT})
})
.then(res=>{
    console.log(`Server running at ${res.url}`)
})
.catch(err=>{
  console.error(err)
})