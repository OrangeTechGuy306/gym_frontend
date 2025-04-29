const express = require("express")
const { createUser, loginUser } = require("../controllers/user.controller")


const userRouter = express.Router()


userRouter.post("/new/user", createUser)
userRouter.post("/user", loginUser)


module.exports =userRouter