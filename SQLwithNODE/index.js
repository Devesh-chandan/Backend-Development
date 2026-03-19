const { faker, id_ID } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require("express");
const app=express();
let port=8080;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sigma_app',
  password: 'Deveshchandan@1012',
});

let  getRandomUser =()=> {
  return [
    faker.string.uuid(), 
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
   
  ];
};


//Inserting new data
// let q="INSERT INTO  user(id,username,email,password)VALUES ?";

// let data=[];
// for(let i=1;i<=100;i++){
//   data.push(getRandomUser());
// }






app.get("/",(req,res)=>{
  let q=`select count(*) from user`;
  try{

    connection.query(q,(err,result)=>{
    if(err)
        throw err;
      let count =result[0]["count(*)"];

  res.render("home.ejs",{count});
  });

}catch(err){
    console.log(err);
    res.send(err)
}

  
});

app.get("/users",(req,res)=>{
  let q=`select * from user`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw(err);
      let data=result;
      console.log(data);
      res.render("users.ejs",{data});
    

    });
  }catch(err){
    res.send("some error occured");
  }
});

app.get("/users/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from user where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
     
      let user=result[0];
     
     
      res.render("edit.ejs",{user});
    });
  }catch(err){
    res.send("some error occured");
  }

 
});

app.patch("/users/:id",(req,res)=>{
 let {id}=req.params;
 let {password: formpassword,username:newusername}=req.body;
  let q=`select * from user where id='${id}'`;

   try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      let user=result[0];
      if(formpassword !=user.password){
        res.send("wrong password");
      }else{
        let q2=`update user set username='${newusername}' where id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err)
            res.redirect("/users");

        });


      }

     
     
      // res.render("edit.ejs",{user});
    });
  }catch(err){
    res.send("some error occured");
  }
});


app.listen("8080",()=>{
console.log("listeineg to port 8080");
});
