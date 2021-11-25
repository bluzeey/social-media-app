import gql from 'graphql-tag'
import {useQuery} from '@apollo/client'
import {Grid,Card} from 'semantic-ui-react'
import moment from 'moment'
import {useContext} from 'react'
import {AuthContext} from '../context/auth'
import LikeButton from '../component/LikeButton'
function SinglePost(props) {
    const postId=props.match.params.postId
    const {user}=useContext(AuthContext)
    const {data :{getPost}}=useQuery(FETCH_POST_QUERY,{
        variables:{
            postId
        }
    })
    let postMarkup;
    if(!getPost){
        postMarkup=<p>Loading Post...</p>
    }else{
        const {id, 
            body,
            createdAt, 
            username,
            comments,
            likes,
            likeCount
            ,commentCount}=getPost
            postMarkup=(
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                        <Image 
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        size="small"
                        float="right" />
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Card fluid>
                              <Card.Content>
                                  <Card.Header>{username}</Card.Header>
                                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                  <Card.Description>{body}</Card.Description>
                              </Card.Content>
                              <hr/>
                              <Card.Content extra>
                                 <LikeButton user={user} post={{id,likeCount,likes}}/>
                                 <Button as="div" labelPosition="right"
                                 onClick={()=>{console.log('Comment on the Post')}}/>
                                 <Button basic color="blue">
                                     <Icon name="comments"/>
                                 </Button>
                                 <Label basic color="blue" pointing="left">
                                     {commentCount}
                                 </Label>
                              </Card.Content>
                          </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
    }
    return (
        <div>
            
        </div>
    )
}

const FETCH_POST_QUERY=gql`
 query($postId:ID!){
     getPost(postId:$postId){
         id body createdAt username likeCount 
         likes{
             username
         }
         commentCount
         comments{
             id username createdAt body
         }
     }
 }`
export default SinglePost
