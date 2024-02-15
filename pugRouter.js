const express = require('express');

const app=express()

app.use(express.static("./public"))


app.set('view engine', 'pug');
app.set('views', './views');




const {getTodos,getTodo} = require("./todosController");
const {getUsers,getUser} = require("./usersController");


app.get('/homePage', (req, res) => {
    res.render('homePage');
});

app.get('/loginPage', (req, res) => {
	res.render('loginPage');
	
});
app.get('/logout', (req, res) => {
    res.render('logout');
});
app.get('/getUsers', getUsers, (req, res) => {
    let data={
        users: req.users
    }
    res.render('getUsers', data);
});
app.get('/createUser', (req, res) => {
    res.render('createUser');
});
app.get('/getUser/:id', getUser, (req, res) => {
    let data={
        user: req.user
    }
    res.render('getUser', data);
});
app.get('/updateUser/:id', getUser, (req, res) => {
    let data={
        user: req.user
    }
    res.render('updateUser', data);
});
app.get('/deleteUser/:id', (req, res) => {
    let data={
        id: req.params.id
    }
    res.render('deleteUser', data);
});



app.get('/getTodos', getTodos, (req, res) => {
    let data={
        todos: req.todos
    }
    res.render('getTodos', data);
});
app.get('/createTodo', (req, res) => {
    res.render('createTodo');
});
app.get('/getTodo/:id', getTodo, (req, res) => {
    let data={
        todo: req.todo
    }
    res.render('getTodo', data);
});
app.get('/updateTodo/:id', getTodo, (req, res) => {
    let data={
        todo: req.todo
    }
    res.render('updateTodo', data);
});
app.get('/deleteTodo/:id', (req, res) => {
    res.render('deleteTodo');
});

module.exports = app;