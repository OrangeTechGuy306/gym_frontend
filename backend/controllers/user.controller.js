const { DB } = require("../sql")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports.createUser = (req, res)=>{
    const {email, fullname, gender, password} = req.body


    try {
        if(!email || !fullname || !gender || !password){
            req.status(400).json({message: "All fields required"})
        }else{
            DB.query("SELECT * FROM users WHERE email = ?", [email], (e, user)=>{
                if(e){
                    res.status(500).json({message: "Unable to create user"})
                }else{
                    if(user.length > 0){
                        res.status(400).json({message: "User with email already exist"})
                    }else{
                        const encryptedPassword = bcrypt.hashSync(password, 10)
                        DB.query("INSERT INTO users(fullname, email, gender, pass_word) VALUES(?,?,?,?)",[fullname, email, gender, encryptedPassword], (er, _)=>{
                            if(er){
                                res.status(500).json({message: "Unable to create user"})
                            }else{
                                res.status(201).json({message: "User registration successful"})
                            }
                        })
                    }
                }
            })
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports.loginUser = (req, res)=>{

    const {email, password} = req.body

    try {
        if(!email || !password){
            req.status(400).json({message: "All fields required"})
        }else{
            DB.query("SELECT * FROM users WHERE email = ?", [email], (e, user)=>{
                if(e){
                    res.status(500).json({message: "Unable to create user"})
                }else{
                    if(user.length > 0){
                        const dbPassword = user[0].pass_word
                        const matchPassword = bcrypt.compareSync(password, dbPassword)
                        if(matchPassword){
                            const token = jwt.sign({id: user[0].user_id}, process.env.JWT_SECRET, {expiresIn: "1d"})
                            res.status(201).json({message:token})
                        }else{
                            res.status(400).json({message: "Invalid Email or Password"})
                        }
                    }else{
                        res.status(400).json({message: "Invalid Email"})
                    }
                }
            })
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}