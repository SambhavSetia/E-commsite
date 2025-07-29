
import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();
const PORT=process.env.PORT||4000;

const app=express();
app.use(express.json());
// app.use(cors());






const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins
  },
  credentials: true
};


app.use(cors(corsOptions));



mongoose.connect("mongodb+srv://sambhavsetia29:ozrpzySTz87vmetM@cluster0.qman5.mongodb.net/e-commerce")


app.listen(PORT,(error)=>{
  if(!error){
    console.log(`Server Running on PORT http://localhost:4000`);
    

  }
  else{
    console.log("Error in listen is :",error);
  }
})



app.get("/",(req,res)=>{
  res.send("Express app is running")
})



//Image Storage Engine
import { storage } from './utils/cloudinary.js'; // update path if needed
const upload = multer({ storage });







app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
  success: 1,
  image_url: req.file.path // Cloudinary hosted URL
});

});



//Schema for creating products
const Product=mongoose.model("Product",{
  id:{
    type:String,
    required:true
  },
  name:{
      type:String,
      required:true
  },
  image:{
    type:String,
    required:true
  }
  ,
  category:{
    type:String,
    required:true
  },
  new_price:{
type:Number,
required:true
  },
  old_price:{
type:Number,
required:true
  },
  date:{
type:Date,
default:Date.now,
available:{
  type:Boolean,
  default:true
}
  }
})

app.post('/addproduct',async(req,res)=>{
  let products =await Product.find({});
  let id;
  if(products.length>0){
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id =Number(last_product.id)+ 1;
    

  }
  else{
    id=1;
  }
const product=new Product({
  id:id,
  name:req.body.name,
  image:req.body.image,
  category:req.body.category,
  new_price:req.body.new_price,
  old_price:req.body.old_price,
});
console.log(product);
await product.save();
res.json({
  success:true,
  name:req.body.name
})
})


// app.post('/removeproduct',async(req,res)=>{
  
//   const deletedProduct = await Product.deleteOne({id:req.body.id});
  
// console.log("Removed")
// res.json({
//     success: true,
//     name:req.body.name
    
//   });
// })
app.post('/removeproduct', async (req, res) => {
  const { id } = req.body;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      console.log("Product deleted:", deletedProduct);
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get('/allproducts',async(req,res)=>{
let products=await Product.find({});
res.send(products)

console.log("ALL Products fetched")
})

//users schema 

const Users=mongoose.model('Users',{
  name:{
    type:String,
    
  },
  email:{
    type:String,
    unique:true
  },
  password:{type:String},
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now()
  }

})


//Creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
  let check=await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,error:"existing user found with same email id"});
  }
  let cart={};
  for(let i=0;i<300;i++){
    cart[i]=0;
  }
  const user=new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  
  })
  await user.save();
  const data ={
    user:{
      id:user.id
    }
  }
      const token=jwt.sign(data,'secret_ecom');
      res.json({success:true,token}); 
})



//endpoint for user login

app.post('/login',async(req,res)=>{
  let user=await Users.findOne({email:req.body.email});
  if(user){
    const passCompare=req.body.password===user.password;
    if(passCompare){
      const data={
        user:{
          id:user.id
        }
      }
      const token=jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else{
      res.json({success:false,error:"Wrong Password"});
    }
    
  }
  else{
    res.json({success:false,error:"Wrong email id"});
  }
})


//endpoint for new collection data
app.get('/newcollections',async(req,res)=>{
  let products=await Product.find({});
  let newcollections=products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollections)

})


//endpoint for popular in women 
app.get('/popularinWomen',async(req,res)=>{
  let products=await Product.find({category:"women"});

let popular_in_women=products.slice(0,4);
console.log("Popular in women fetched");
res.send(popular_in_women);

})

//creating middleware to fetch user
const fetchUser=async(req,res,next)=>{
  const token=req.header('auth-token');
  if(!token){
    res.status(401).send({errors:"Please authenticate using valid token"})
  }

  else{
    try {
      const data=jwt.verify(token,'secret_ecom');
      req.user=data.user;
      next();
      
    } catch (error) {
      res.status(401).send({errors:"please authenticate using a valid token"})
    }
  }

}
//endpoint for adding product in cartDta

app.post('/addtocart',fetchUser,async(req,res)=>{
  console.log("Added",req.body.itemId);
  let userData=await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId]+=1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send("Added")
})


//create endpoint to remove the producuct from cartData

app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  
  let userData = await Users.findOne({ _id: req.user.id });

  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  // Send a proper JSON response
  res.json({ message: "Removed" });
});



//creating endpoint to get cart data

app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("Get cart");
  let userData=await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})