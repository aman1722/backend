const express = require("express")
const { connection } = require("./connection/db")
const { userRouter } = require("./routes/user.router")
const { postRouter } = require("./routes/post.router")
const {auth}=require("./middleware/auth.middleware")
var cors = require('cors');
require("dotenv").config()


const app = express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)




// App listning
app.listen(process.env.port,async()=>{
   try {
     await connection
     console.log("connected to db!")
   } catch (error) {
    console.log("unable to connect db!")
    console.log(error)
   }
  console.log(`app is running at port ${process.env.port}`)
})