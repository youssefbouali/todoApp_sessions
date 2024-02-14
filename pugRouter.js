const express = require('express');
const session=require("express-session");

const app=express()

app.use(express.static("./public"))

app.use(session({
    secret:"Mon secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:10800000
    }
}));


app.set('view engine', 'pug');
app.set('views', './views');




const {getTodos,getTodo} = require("./todosController");
const {getUsers,getUser} = require("./usersController");

const {authMiddlewareSession}=require("./authMiddleware")


app.get('/homePage', (req, res) => {
    res.render('homePage', { session: req.session.user });
});

app.get('/loginPage', (req, res) => {
	if (!req.session.user){
		res.render('loginPage', { session: req.session.user });
	} else {
		res.redirect('/homePage');
	}
	
});
app.get('/getUsers', authMiddlewareSession, getUsers, (req, res) => {
    let data={
        users: req.users,
		session: req.session.user
    }
    res.render('getUsers', data);
});
app.get('/logout', authMiddlewareSession, (req, res) => {
    req.session.destroy();
    res.redirect('/loginPage');
});
app.get('/createUser', (req, res) => {
    if (!req.session.user){
		res.render('createUser', { session: req.session.user });
	} else {
		res.redirect('/homePage');
	}
});
app.get('/getUser/:id', authMiddlewareSession, getUser, (req, res) => {
    let data={
        user: req.user,
		session: req.session.user
    }
    res.render('getUser', data);
});
app.get('/updateUser/:id', authMiddlewareSession, getUser, (req, res) => {
    let data={
        user: req.user,
		session: req.session.user
    }
    res.render('updateUser', data);
});
app.get('/deleteUser/:id', authMiddlewareSession, (req, res) => {
    let data={
        id: req.params.id,
		session: req.session.user
    }
    res.render('deleteUser', data);
});



app.get('/getTodos', authMiddlewareSession, getTodos, (req, res) => {
    let data={
        todos: req.todos,
		session: req.session.user
    }
    res.render('getTodos', data);
});
app.get('/createTodo', authMiddlewareSession, (req, res) => {
    res.render('createTodo', { session: req.session.user });
});
app.get('/getTodo/:id', authMiddlewareSession, getTodo, (req, res) => {
    let data={
        todo: req.todo,
		session: req.session.user
    }
    res.render('getTodo', data);
});
app.get('/updateTodo/:id', authMiddlewareSession, getTodo, (req, res) => {
    let data={
        todo: req.todo,
		session: req.session.user
    }
    res.render('updateTodo', data);
});
app.get('/deleteTodo/:id', authMiddlewareSession, (req, res) => {
    res.render('deleteTodo', { session: req.session.user });
});

module.exports = app;