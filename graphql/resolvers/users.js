const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {UserInputError}=require('apollo-server')

const {SECRET_KEY}=require('../../config')
const User=require('../../models/user.js');
const {validateRegisterInput,validateLoginInput}=require('../../utils/validators.js')

 module.exports={
    Mutation:{
         async login(_,{password,username}){
             const {errors,valid}=validateLoginInput(username,password)
         },
         async register(_,
            {registerInput: {username,email,password,confirmPassword}
        },
             context,
             info){
           //TODO: Validate User Data
           const {valid,errors}=validateRegisterInput(username,email,password,confirmPassword)
           if(!valid){
               throw new UserInputError('Errors',{errors});
           }
           //TODO: Make sure the user doesn't already exists
           const user=await User.findOne({username});
           if(user){
              throw new UserInputError('Username is Taken',{
                  errors:{
                      username:'This username is already taken'
                  }
              })
           }
           //:hash password and create an auth id 
           password= await bcrypt.hash(password,12)

           const newUser=new User({
               email,
               username,
               password,
               createdAt:new Date().toISOString()
           });

           const res=await newUser.save()

           const token=jwt.sign({               id:res.id,
               email:res.email,               username:res.username
           },SECRET_KEY,{expiresIn:'1h'})

           return{
               ...res._doc,
               id:res._id,
               token
           }
         }
     }
 }