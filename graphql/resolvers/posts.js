import {Post} from '../../models/post.js'
 const resolvers={
    Query:{
        async getPosts(){
            try{
                const posts=await Post.find();
                return posts;
            }
            catch(err){
                throw new Error(err);
            }
        }
    }
}
export default resolvers;