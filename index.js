const express=require("express");
const app=express();
app.use(express.json());

const emp=[
    {
        empid:1,
        name:"Narmu",
        salary:50000
    },
    {
        empid:2,
        name:"Pooja",
        salary:50000
    },
    {
        empid:3,
        name:"Vani",
        salary:50000
    }
]
app.get("/employee",(req,res)=>{   //its displays the data inside the array
    res.send(emp);
})
 
app.post("/employee",(req,res)=>{  //its is used to store the data in running time
    const additional=req.body;
    emp.push(additional);
    res.send(emp);
})

app.post("/employee",(req,res)=>{   //to fill all requirements in the field
    const {id,name,salary}=req.body;
    if(!id || !name || !salary){
        return res.send("All fields are required");
    }
    const Newemp={id,name,salary};
    emp.push(Newemp);
    res.send(emp);
})


app.get("/employee/:id",(req,res)=>{   //by giving the id num in url we can get the data
    const {id}=req.params;
    console.log(typeof(id));
    const empId=parseInt(id);
    const f=emp.find((u)=>u.id==empId);
        res.send(f);
})


app.listen(5000,()=>{
    console.log("Server is listening on port 5000");
});