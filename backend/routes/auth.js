import exp from 'express'
import User  from '../models/User.js'

export const authRouter=exp.Router()
authRouter.post('/auth',async(req,res)=>{
    try{

    const newAuthObj=new User(req.body);
    const savedUser=await newAuthObj.save()
    
    // Remove password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        return res.status(201).json({ message: "User Created", payload: userResponse });
    }
    catch(err){
        console.error("Mongoose Error:", err.message);
        res.status(400).json({message:"Registration failed"})
    }
})