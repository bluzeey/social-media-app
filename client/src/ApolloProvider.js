import App from './App'
import {ApolloClient,InMemoryCache,HttpLink,ApolloProvider} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const Link = new HttpLink({
    uri:"https://tw1tterdev.herokuapp.com/"
})

const authLink=setContext(()=>{
    const token=localStorage.getItem('jwtToken');
    return {
        headers:{
            Authorization:token ? `Bearer ${token}`:''
        }
    }
})

const client = new ApolloClient({
    link:authLink.concat(Link),
    cache:new InMemoryCache()
})


export default (
<ApolloProvider client={client}>
    <App/>
</ApolloProvider>);
