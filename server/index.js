const express=require('express')
const { connectDb } = require('./config/database')
const app=express()
const cors=require('cors')

const authRouter=require('./routes/authRouter')
const apiRouter=require('./routes/apiRouter')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

connectDb();
app.listen(4000,()=>{
    console.log("listening on port 4000")
})

app.get("/",(req,res)=>{
    res.send("hi")
})

app.use("/auth",authRouter);

app.use("/api",apiRouter);