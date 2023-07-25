const user  = require('../models/user')
const bcrypt = require('bcrypt')
const { MongoClient, ServerApiVersion } = require('mongodb');



//Funciton for the POST request to create a new User
const signup = async (req, res) =>{
    try{
        //Get the Credentials from the front-end
        const {firstname, lastname, email, username, password} = req.body

        const alreadyExist = await user.findOne({email});

        //Check if the User with that email already exist
        if(alreadyExist){
            res.status(400).json({
                success: false,
                message: 'Email Already Exist'
            })
        }

        //Encrypt the Password
        let hashedPassword
        hashedPassword = await bcrypt.hash(password, 10)

        //Create the New User
        const newUser = await user.create({
            firstname, lastname, email, username, password:await hashedPassword
        })


        //Respond the Client Side with the status of the process
        if(newUser){
            return res.status(200).json({
                success:true,
                message:"User created Successfully"
            })
        }else{
            return res.status(500).json({
                success: false,
                message:"Error in creating User"
            })
        }
    }catch(error){
        console.log(error)
    }

}


const login = async (req,res) =>{
    try{
        const {email, password} = req.body

        if(!email || !password){
            req.session.error = "User Not Found!"
            return res.status(400).json({
                success:false,
                message:"Please Enter the Email and Password"
            })
        }

        const findUser = await user.findOne({email})

        if(!findUser){
            return res.status(400).json({
                success:false,
                message:"User Email not Found"
            })
        }else{
            await bcrypt.compare(password, findUser.password, function(err, result){
                if(result){
                    req.session.isAuth = true;
                    return res.status(200).json({
                        success:true,
                        message:"Login Successful"
                    })
                }else{
                    return res.status(400).json({
                        success:false,
                        message:"Password did not match"
                    })
                }
            })
        }
    
    }catch(error){
        console.log(error)
    }
}


module.exports = {signup, login}