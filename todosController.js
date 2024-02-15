const jwt = require('jsonwebtoken');
const Todo = require('./todoModel');
const User = require('./userModel');

const login=async (req,res)=>{
    const auth=req.headers["authorization"]
    if(req.session?.user){
        res.send({error: "You are already logged in"})
    } else {
		
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
			
			req.session.user=user._id
			
			res.send(token)
			
			
		} else {
            return res.send({error: "Invalid credentials"});
        }
	})
    }
    else res.send({error: "Need Login and Password"})
	
	}
	
	
        
    
}

const getTodos=async (req,res,next)=>{
    const todos=await Todo.find({})
    req.todos=todos
	next();
}

const getTodo=async (req,res,next)=>{
    const id=req.params.id
    const todo=await Todo.findById(id)
    req.todo=todo
	next();
}

const createTodo=async (req,res)=>{
    req.body.user_id=req.userId
    const todo=req.body
    const todoInfo=await Todo.create(todo)
    res.send(todoInfo)
}

const updateTodo=async (req,res)=>{
    const todo=req.body
    const id=req.params.id
    await Todo.findByIdAndUpdate(id,todo)
    res.send(todo)
}

const deleteTodo=async (req,res)=>{
    const id=req.params.id
    const todo=await Todo.findByIdAndDelete(id)
    res.send(todo)
}

module.exports = {login,getTodos,createTodo,getTodo,updateTodo,deleteTodo}