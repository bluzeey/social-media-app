import App from './App'
import {ApolloClient,InMemoryCache,HttpLink,ApolloProvider} from '@apollo/client'

const Link = new HttpLink({
    uri:"http://localhost:5000"
}) 

const client = new ApolloClient({
    link:Link,
    cache:new InMemoryCache()
})

export default (
<ApolloProvider client={client}>
    <App/>
</ApolloProvider>);
