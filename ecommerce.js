const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://vanisenthil140_db_user:S7SWmPs1zdHf2MTB@cluster0.v3mto3v.mongodb.net")  //to connect the DB
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
});

const ProductSchema=new mongoose.Schema({  //schema is the structure that contain the variable and data types
    name:String,
    id:Number,
    price:Number,
    description:String,
    image:String
});

const products=mongoose.model("Product",ProductSchema) //used to create the model model creates the collection in db.
  
app.post("/getProducts",async(req,res)=>{ //to give input
    const{name,id,price,description,image}=req.body;
const newProduct=new products({name,price,description,image});
await newProduct.save();
res.send(newProduct);
}
)

   //its displays the data inside the array
app.get("/getProducts",async(req,res)=>{
    try{
    const products=await Products.find();
    res.send(products);
    }
    catch(err){
        res.status(500).send("Error");
    }
})

app.get("/getProducts/:id",async(req,res)=>{
      
    try{
        const{id}=req.params;
    const prod=await User.findByIdAndDelete(id);
    res.send(prod);
    if(!prod){
        console.log("Product Not Found Not Found");
    }
    }
    catch(err){
        res.status(500).send("Error retrieving user data");
    }
})




 


app.listen(5000,()=>{
    console.log("server is running on 5000 port");
})