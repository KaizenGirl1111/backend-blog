const connectDb = require('./db/connection')
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const blogRoutes = require('./routes/blogRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true //for cookies
}))
connectDb()
app.use(cookieParser())
app.use(express.json())
app.get('/',(_,res)=>{
    res.send("Welcome page")
    console.log("Welcome page")
})
app.use(userRoutes)
app.use(taskRoutes)
app.use(blogRoutes)
app.listen(8002,()=>{
    console.log("Server started at 8002")
})