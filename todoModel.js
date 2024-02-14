const mongoose = require('mongoose');

let todo=new mongoose.Schema({
   user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
   },
   title: {
        type:String
   },
   completed: {
       type:Boolean,
       default:false
   }
   
},{timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
}});

const Todo = mongoose.model('Todo', todo);
module.exports = Todo; 