const { Schema, model } = require('mongoose');

let user=new Schema({
   name: {
        type:String,
        unique:true
    },
   age: Number,
   email: {
       type:String,
       unique:true,
       required:true
   },
   password: {
       type:String
},
   
},{timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
}});

const User = model('User', user);
module.exports = User;