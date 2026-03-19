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
    email:String,

});

const postSchema=new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

});


const User=mongoose.model("User",userSchema);
const Post=mongoose.model("Post",postSchema);


const addData=async()=>{
    let user1=new User({
        username:"devesh paliwal",
        email:"creas8x1@gmail.com"
    });

    let user=await User.findOne({username:"devesh"});

     let post1=new Post({
        content:"hello everyone",
        likes:7,
    });

    let post2=new Post({
        content:"hello nagpur",
        likes:100,
    });


    post2.user=user;
    await user1.save();
    await post1.save();
    await post2.save();
}

addData();