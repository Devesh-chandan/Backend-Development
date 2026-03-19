const express=require ("express");
const app=express();
// console.dir(app); 
let port =3000;
app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);

});

app.get("/",(req,res)=>{
    res.send("you contacted root path");
});

app.get("/home",(req,res)=>{
    res.send("you contacted home path");
});

app.get("/search",(req,res)=>{
    res.send("you contacted search path");
});

app.get("/help",(req,res)=>{
    res.send("you contacted help! path");
});

// app.get(/.*/, (req, res) => {
//     res.status(404).send("Path does not exist");
// });

app.get("/:username/:id", (req, res) => {
    let {username,id}=req.params;
   res.send(`welcome to page of @${username,id}`);
});


// app.use((req,res)=>{
//     console.log("request recieved at terminal");
//     res.send({
//         name:"apple",
//         color:"red",
//     });
// });