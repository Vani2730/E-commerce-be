const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json()); 


mongoose.connect("mongodb://localhost:27017/mydb")  //to connect the DB
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
}); 

const userSchema=new mongoose.Schema({  //schema is the structure that contain the variable and data types
        name:String,
    age:Number,
    salary:Number,
    email:String,
    isPlaced:Boolean
});

const User=mongoose.model("User",userSchema) //used to create the model model creates the collection in db.
 
app.post("/users",(req,res)=>{
    const{name,age,salary,email,isPlaced}=req.body;
const newUser=new User({name,age,salary,email,isPlaced});
newUser.save();
res.send(newUser);
}
)

app.get("/getusers",async(req,res)=>{
    try{
    const users=await User.find();
    res.send(users);
    }
    catch(err){
        res.status(500).send("Error");
    }
})

app.get("/getusers/:id",async(req,res)=>{
      
    try{
        const{id}=req.params;
    const users=await User.findById(id);
    res.send(users);
    if(!users){
        console.log("User Not found");
    }
    }
    catch(err){
        res.status(500).send("Error retrieving user data");
    }
})

    app.get("/getusers/:id",async(req,res)=>{
      
    try{
        const{id}=req.params;
    const users=await User.findByIdAndDelete(id);
    res.send(users);
    if(!users){
        console.log("User Not found");
    }
    }
    catch(err){
        res.status(500).send("Error retrieving user data");
    }
})


   
app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});