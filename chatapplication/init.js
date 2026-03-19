const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("CONNECTION SUCCESFULL")
})



.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allchats=[
    {
    from:"devesh",
    to:"dip",
    msg:"send me assignments",
    created_at:new Date()
    },
    {
    from:"dev",
    to:"yash",
    msg:"send me notes",
    created_at:new Date()
    },
    {
    from:"kartik",
    to:"dip",
    msg:"send me images",
    created_at:new Date()
    },

];


Chat.insertMany(allchats);