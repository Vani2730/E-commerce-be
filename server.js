const express=require("express");
const app=express();
app.use(express.json());



// const products=[
//     {
//         id:"001",
//         name:"Laptop",
//         price:60000
//     },
//      {
//         id:"002",
//         name:"Mobile",
//         price:30000
//     },
//      {
//         id:"003",
//         name:"Watch",
//         price:10000
//     },
// ]
// app.get("/about",(req, res)=>{
//     res.send("Hello about page");
// })
// app.get("/products",(req,res)=>{
//     res.send(products);
// })
// app.get("")


const userArray=[
    {id:1,name:"alexa",age:50,dept:"ece",salary:50000},
    {id:2,name:"bob",age:20,dept:"cse",salary:60000},
    {id:3,name:"charlie",age:70,dept:"it",salary:70000}
]; 

app.post("/user",(req, res)=>{
    const user=req.body;
    userArray.push(user);
    res.send(userArray);
})
app.post("/user",(req,res)=>{
    const {id,name,age,dept,salary}=req.body;
    if(!id || !name || !age || !dept || !salary){
        return res.send("All fields are required");
    }
    
    const Newuser={id,name,age,dept,salary};
    userArray.push(NewUser);
    res.send(userArray);
})
app.get("/user/:id",(req,res)=>{
    const {id}=req.params;
    console.log(typeof(id));
    const userId=parseInt(id);
    const f=userArray.find((u)=>u.id==userId);
    if(!userId){
        return("User Not Found!");
    }
    
        res.send(f);
    
})


app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});