const express = require("express")
const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const jsonwebtoken=require("jsonwebtoken")
const userModel=require("./models/users")
const postModel = require("./models/posts")

let app =express()

app.use(express.json)
app.use(cors())

mongoose.connect("mongodb+srv://jacobmarkmathew:jacobmark52@cluster0.w92biv9.mongodb.net/blogappDb?retryWrites=true&w=majority&appName=Cluster0")

//create a post

app.post("/create",async(req,res)=>{
    let input=req.body
    let token = rq.headers.token

    jsonwebtoken.verify(token,"blogApp",async(error,decoded)=>{
        if(decoded && decoded.email){
            let result= new postModel(input)
            await result.save()
            res.json({"status":"success"})
        }
        else{
            res.json({"status":"invalid authentication"})
        }
    })

})




//sign in
app.post("/sign In",async(req,res)=>{
    let input=req.body
    let result=userModel.find({email:req.body.email}).then((items)=>{
        if(items.length>0){

            const passwordValidator=bcrypt.compareSync(req.body.password,items[0].password)
            if (passwordValidator){

                jsonwebtoken.sign({email:req.body.email},"blogApp",{expiressIn:"1d"},(error,token)=>{
                    if(error){
                        res.json({"status":"error"})
                    }
                    else{
                        res.json({"status":"success","token":token,"userid":items[0].id})   
                    }
                })

               
            }
            else{
                res.json({"status":"success"})
            }

        }
        else{
            res.json({"status":"Invalid Email Id"})
        }
    }).catch()
})

//signup
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