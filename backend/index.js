const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/user.routes")
require("dotenv").config()


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/",userRouter)

const port = process.env.PORT || 8888

app.listen(port, ()=>console.log(`Server running on PORT: ${port}`))