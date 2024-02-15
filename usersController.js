const jwt = require('jsonwebtoken');
const User=require("./userModel");
const bcrypt = require('bcrypt');

const login=async (req,res)=>{
    const auth=req.headers["authorization"]
    try{
		const token=auth.split(" ")[1];
        const data=jwt.verify(token, process.env.SECRET)
        res.send({error: "You are already logged in"})
    }catch(e){
		
    const data=req.body
    if(data.email && data.password){
    //console.log(data)
    const user=await User.findOne({email:data.email})
    //console.log(user)
    bcrypt.compare(data.password,user.password,(err,result)=>{
        if (err) console.log(err)
		if (result) {
			//console.log(user.email)
			//res.send(user)
			
			const token=jwt.sign(
            {userId:user._id},
            process.env.SECRET,
            {expiresIn:'1h'}
            )
			
			res.send(token)
			
			
		} else {
            return res.send({error: "Invalid credentials"});
        }
	})
    }
    else res.send({error: "Need Login and Password"})
        
    }
	
	
        
    
}

const getUsers=async (req,res,next)=>{
    const users=await User.find({})
    
	req.users=users
	next();
}

const getUser=async (req,res,next)=>{
    const id=req.params.id
    const user=await User.findById(id)
	
	req.user=user
	next();
}

const createUser=async (req,res)=>{
    const user=req.body
    bcrypt.hash(user.password, 10, async function(err, hash) {
        user.password=hash
        const userinfos = await User.create(user)
			
			const token=jwt.sign(
            {userId:userinfos._id},
            process.env.SECRET,
            {expiresIn:'1h'}
            )
			
			res.send(token)
    });
}

const updateUser=async (req,res)=>{
    const user=req.body
    const id=req.params.id
    //let oldUser=User.find({_id:user.id})
    bcrypt.hash(user.password, 10, async function(err, hash) {
        user.password=hash
		//await User.findByIdAndUpdate(user._id,user)
		await User.findByIdAndUpdate(id,user)
    });
    res.send(user)
}

const deleteUser=async (req,res)=>{
    const user=req.body
    //let oldUser=User.find({_id:user.id})
    await User.findByIdAndDelete(user._id,user)
    res.send(user)
}

module.exports = {getUsers, createUser,getUser,updateUser,deleteUser,login}