const mongoose=require("mongoose");
const {Schema}=mongoose;


main().then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

}

const orderSchema=new Schema({
    item:String,
    price:Number,

    
});
const customerSchema=new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ]


});

// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("pre middleware");
// });


//if i have a customer with 2-3 orders in his list and if i delete customer from my database the below function will delete the corresponding orders for the particular customer from database

  
customerSchema.post("findOneAndDelete",async(customer)=>{
    if(customer.orders.length){
        let res=await Order.deleteMany({_id:{$in:customer.orders}});
        console.log(res);
    }
});

const Order=mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);









// const addCustomer=async()=>{
//     let cust1=new Customer({
//         name:"Devesh Chandan"
//     });

//     let order1=await Order.findOne({item:"smooth"});
//     let order2=await Order.findOne({item:"samosa"});

//     cust1.orders.push(order1);
// cust1.orders.push(order2);

// let result=await cust1.save();
// console.log(result);

// let result=await Customer.find({});
// console.log(result);
// };

// addCustomer();



const findCustomer=async()=>{

let result=await Customer.find({}).populate("orders");
console.log(result);
};

findCustomer();



// const addOrders=async()=>{
//     let res=await Order.insertMany([
//         {item:"samosa",price:18},
//         {item:"smooth",price:10},
//         {item:"wadapav",price:20}
//     ]);
//     console.log(res);
// };
// addOrders();


const addCust=async()=>{
    let newCust=new Customer({
        name:"devesh"
    });

    let newOrder=new Order({
        item:"coke sero",
        price:250
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};



const delCust=async()=>{
    let result=await Customer.findByIdAndDelete("695ce983780dbf51c00f1e73");
    console.log(result);
}

// addCust();
delCust();