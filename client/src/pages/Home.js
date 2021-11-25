import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import PostCard from '../component/PostCard.js'
import PostForm from '../component/PostForm.js'
import {AuthContext} from '../context/auth'
import {useContext} from 'react'

function Home() {
    const {user} =useContext(AuthContext) 
    const {loading,data}=useQuery(FETCH_POSTS_QUERY)
    const posts=data?.getPosts
    return (
    <Grid columns={3}>
     <Grid.Row className="page-title">
       <h1>Recent Posts</h1>
     </Grid.Row>
     <Grid.Row>
       {user && (
         <Grid.Column>
           <PostForm/>
          </Grid.Column>
       )}
        {loading ?(
            <h1>Loading Post...</h1>
        ):(
            posts && posts.map(post=>(
                <Grid.Column key={post.id} style={{marginBottom:20}}>
                   <PostCard post={post}/>
                </Grid.Column>
            ))
        )}
     </Grid.Row>
     </Grid>
    )
}
const FETCH_POSTS_QUERY=gql`
{

  getPosts {
    id
    body
    createdAt
    username
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}`
export default Home
