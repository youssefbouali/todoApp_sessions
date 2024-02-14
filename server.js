const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())
require("dotenv").config();
const todosRouter = require('./todosRouter');
const usersRouter = require('./usersRouter');
app.use(express.urlencoded({ extended: true }));



const uri="mongodb://localhost/todo";
(async ()=>{
   try{
       const conn=await mongoose.connect(uri)
       console.log("connected to db ....")
   }catch(err){
       console.log(err)
   }
})();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to todos api, try it using /todos' });
});




const pugRouter = require('./pugRouter');
app.use(pugRouter)




app.use('/todos', todosRouter);
app.use('/users', usersRouter);



app.use((req,res)=>{
    res.status(404).sendFile(__dirname + '/public/error.html')
})



app.listen(80,()=>console.log("localhost On port 3000"))
