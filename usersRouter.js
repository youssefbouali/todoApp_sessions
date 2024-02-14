const express = require('express');
const router = express.Router();
const {login,getUsers,createUser,getUser,updateUser,deleteUser} = require("./usersController");
const {authMiddleware}=require("./authMiddleware")



router.post("/login",login)
router.get("/", authMiddleware, getUsers, (req, res) => {
    res.send(req.users);
})
router.post("/", createUser)
router.get("/:id", authMiddleware, getUser, (req, res) => {
    res.send(req.user);
})
router.put("/:id", authMiddleware, updateUser)
router.delete("/:id", authMiddleware, deleteUser)


module.exports = router;