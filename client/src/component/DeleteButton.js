import gql from 'graphql-tag'
import {useState} from 'react'
import {useMutation} from '@apollo/client'
import {Button,Confirm,Icon,Label,Image} from 'semantic-ui-react'
function DeleteButton({postId}) {
    const [confirmOpen,setConfirmOpen] = useState(false)
    const [deletePost,{error}]=useMutation(DELETE_POST_MUTATION,
         update(){
            setConfirmOpen(false);

         },
         {variables:{
             postId
         }})
    return (
        <>
        <Button as='div' color="red" floated="right" onClick={()=>console.log('Delete Post')}>
            <Icon name="trash" style={{margin:0}}/>    
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={()=>{setConfirmOpen(false)}}
          onConfirm={deletePost}
          />
          </>
    )
}
const DELETE_POST_MUTATION=gql`
   mutation deletePost($postId:ID!){
       deletePost(postId:$postId)
   }`
export default DeleteButton
