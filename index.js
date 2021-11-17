const { ApolloServer} = require('apollo-server');
const {gql}=require('graphql-tag')
const mongoose=require('mongoose');
const typeDefs=gql`
type Query{
     sayHi:String!
}`

const resolvers={
    Query:{
        sayHi:()=>'Hello World'
    }
}

const server=new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect('mongodb+srv://sahilm:sahilm123@app-database.dfcxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true}).then(()=>{
    console.log('MongoDB connected , launch fireworks!')
    return server.listen({port:5000})
})
.then(res=>{
    console.log(`Server running at ${res.url}`)
})