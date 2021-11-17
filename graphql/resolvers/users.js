const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const User=require('../../models/user');

module.exports={
    Mutation:{
        async register(_,
            {registerInput:{username,email,password,confirmPassword}}
            ,context,
            info){
          //TODO: Validate User Data
          //TODO: Make sure the user doesn't already exists
          //TODO:hash password and create an auth id 
          password= await bcrypt.hash(password,12)

          const newUser=new User({
              email,
              username,
              password,
              createdAt:new Date().toISOString()
          });

          const res=await newUser.save()

          const token=jwt.sign({
              id:res.id,
              email:res.email,
              username:res.username
          },{})
        }
    }
}