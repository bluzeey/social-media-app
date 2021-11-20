const postsResolvers=require('./posts.js')
const usersResolvers=require('./users')

module.exports={
    Query:{
        ...postsResolvers.Query,
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}