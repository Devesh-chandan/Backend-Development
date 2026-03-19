const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});

const User=mongoose.model("User",userSchema);
const User1=new User({name:"devesh",email:"devesh@yahoo.in",age:22});
const User2=new User({name:"dip",email:"dip@yahoo.in",age:18});
User1.save();
User2
.save()
.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err);
});


User.insertMany([
    {name:"rahul",email:"rahul@123",age:25},

    {name:"sonam",email:"sonam@123",age:20},
]).then((res)=>{
    console.log(res);
})


User.find({})
.then((res)=>{
console.log(res);
})
.catch((err)=>{
    console.log(err);
});
main()
.then((res)=>{
    console.log("connection succesful");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}