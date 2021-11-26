import gql from 'graphql-tag'
import {useQuery,useMutation} from '@apollo/client'
import {Grid,Card,Icon,Label,Button,Image,Form,Popup} from 'semantic-ui-react'
import moment from 'moment'
import {useContext,useState,useRef} from 'react'
import {AuthContext} from '../context/auth'
import LikeButton from '../component/LikeButton'
import DeleteButton from '../component/DeleteButton'
import {useParams,useNavigate} from 'react-router-dom'
function SinglePost() {
    const postId=useParams().postId
    const navigate=useNavigate()
    const commentInputRef=useRef(null)
    const [comment,setComment]=useState('')
    const {user}=useContext(AuthContext)
    const {data,loading}=useQuery(FETCH_POST_QUERY,{
        variables:{
            postId,
        },
        onError(err){
            console.log(err)
        }
    })
    const [submitComment]=useMutation(SUMBMIT_COMMENT_MUTATION,{
        update(){
            setComment('')
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body:comment
        }
    })
    const deletePostCallback =()=>{
        navigate('/')
    }
    let postMarkup;
    if(loading){
         postMarkup=<p>Loading Post...</p>
    }else{
        const {id, 
            body,
            createdAt, 
            username,
            comments,
            likes,
            likeCount
            ,commentCount}=data?.getPost
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
                                 <Popup
                                   content="Comment on Post"
                                   inverted
                                   trigger={ <Button as="div" labelPosition="right"
                                 onClick={()=>{console.log('Comment on the Post')}}>
                                 <Button basic color="blue">
                                     <Icon name="comments"/>
                                 </Button>
                                 <Label basic color="blue" pointing="left">
                                     {commentCount}
                                 </Label>
                                 </Button>}/>
                                 {user && user.username===username &&(
                                     <DeleteButton postId={id} callback={deletePostCallback}/>
                                 )}
                              </Card.Content>
                          </Card>
                          {user && (
                              <Card fluid>
                                <Card.Content>
                                  <p>Post a comment</p>
                                  <Form>
                                      <div className="ui action input field">
                                          <input
                                             type="text"
                                             placeholder="Comment.."
                                             name="comment"
                                             value={comment}
                                             onChange={event=>setComment(event.target.value)}
                                             ref={commentInputRef}
                                             />
                                             <button type="submit" 
                                               className="ui button teal"
                                               disabled={comment.trim()===""}
                                               onClick={submitComment}>
                                                   Submit
                                             </button>
                                      </div>
                                  </Form>
                                </Card.Content>
                                </Card>
                          )}
                          {comments.map(comment=>(
                              <Card fluid key={comment.id}>
                               <Card.Content>
                                {user && user.username===comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id}/>
                                )}
                               <Card.Header>{comment.username}</Card.Header>
                               <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                               <Card.Description>{comment.body}</Card.Description>
                               </Card.Content>
                              </Card>
                          ))}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
    }
    return postMarkup
}

const SUMBMIT_COMMENT_MUTATION=gql`
   mutation($postId:ID!,$body:String!){
       createComment(postId:$postId,body:$body){
           id
           comments{
               id body createdAt username
           }
           commentCount
       }
   }`

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
