const express=require("express");
const app=express();
const port=3000;
const path = require("path"); 



app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});



app.get("/ig/:username",(req,res)=>{
    const {username}=req.params;

    const instadata=require("./data.json");
    const data=instadata[username];
    console.log(data);
   if(data){
    res.render("instagram.ejs",{data});
   }else{
    res.render("errors.ejs");
   }

    
});


app.get("/rolldice",(req,res)=>{
    let num=Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{diceval:num});
});
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});