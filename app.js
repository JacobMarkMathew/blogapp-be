const express = require("express")
const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const jsonwebtoken=require("jsonwebtoken")
const userModel=require("./models/users")

let app =express()

app.use(express.json)
app.use(cors())

mongoose.connect("mongodb+srv://jacobmarkmathew:jacobmark52@cluster0.w92biv9.mongodb.net/blogappDb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/signup",async(req,res)=>{
   
let input=req.body
let hashedpassword = bcrypt.hashSync(req.body.password,10)
console.log(hashedpassword)
req.body.password=hashedpassword
console.log(data)


 userModel.find({email:req.body.email}).then((items)=>{
    console.log(items)
 }).catch(
    (error)=>{}
 )
        if(items.length>0){
            res.json({"status":"email id already exist" })
        }
        else{
            let result= new userModel(input)
            await result.save()
            res.json({"status":"success"})
        }
   
}

)

app.listen(3030,()=>{
    console.log("server started")
})