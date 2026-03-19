const mongoose=require("mongoose");
const {Schema}=mongoose;


main().then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

}

const userSchema=new Schema({
    username:String,
    addresses:[
        {
            _id:false,
            location:String,
            city:String,
        },
    ],
});

const User=mongoose.model("User",userSchema);

const addUsers=async()=>{
    let user1=new User({
        username:"sherlockholmes",
        addresses:[{
            location:"USA",
            city:"new york",
            
        }],
    });
    user1.addresses.push({loaction:"UAE",city:"Dubai"});

   let result= await user1.save();
   console.log(result);
}

addUsers();