const express =require("express");
const app = express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));


//new chat  route


app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");

});

//Create chat route

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newchat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
   newchat
   .save()
   .then(res=>{
    console.log("new chat saved!!")
   })
   .catch((err)=>{
   
    console.log(err);
   });
   


res.redirect("/chats");
});

//edit route

app.get("/chats/:id/edit", async (req,res)=>{
    let {id}=req.params;

    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});

});
 
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    let updatedchat= await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidator:true,new:true}
    );
console.log(updatedchat);
res.redirect("/chats");

});

//delete route

app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
   let chatToDelete= await Chat.findByIdAndDelete(id);
   console.log(chatToDelete);
   res.redirect("/chats");

});



main().then(()=>{
    console.log("CONNECTION SUCCESFULL")
})
.catch((err) => 
    {
        console.log(err);
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
    }
);



// let chat1=new Chat({
//     from:"devesh",
//     to:"dip",
//     msg:"send me assignments",
//     created_at:new Date()
// });
// chat1.save().then(res=>{
//     console.log(res);
// });




app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});