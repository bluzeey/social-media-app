import {ApolloServer} from 'apollo-server'
import {gql} from 'graphql-tag'
const typeDefs=gql`
type Query{
     sayHi:String!
}`

const resolvers={
    Query:{
        sayHi:()=>'Hello World'
    }
}

const server=new 