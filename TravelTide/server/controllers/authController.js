import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// user registration
export const register = async(req,res)=>{
    const {username, email, password, photo, role} = req.body;
    try { 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({success:false, message: 'User already exists'})
        }
        // this is a check condition for not allowing multiple admin users
        // if (role === "admin" ) {
        //     const existingAdmin = await User.findOne({ role: "admin" });
        //     if (existingAdmin) {
        //         return res.status(400).json({ message: "Admin user already exists" });
        //     }
        // }
        
        // hashing password
        const salt =  bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        // creating new user
        const newUser = new User({
            username,
            email,
            password: hash,
            photo,
            role: role || 'user'
        })
         
        await newUser.save()
        res.status(200).json({success:true, message: 'Successfully created'})
    } catch (err) {
        res.status(500).json({success:false, message: 'Failed to create. Try again'})
    }
};

// user login
export const login = async(req,res)=>{
    const email = req.body.email
    try { 
        const user = await User.findOne({email})
        // if user doesn't exist
        if(!user){
            return res.status(404).json({success:false, message: 'User not found'})
        }

        // if user is exist then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        // if password is incorrect
        if(!checkCorrectPassword){
            return res.status(401).json({success:false, message:"Incorrect email or password"})
        }
       const {password,role , ...rest}=user._doc

    //    create jwt token
    const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'15d'});

        // set token in browser cookie
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({token,
            data:{...rest},
        role,
    })


    } catch (err) {
        res.status(500).json({success:false, message: 'Failed to login. Try again'})
    }
}