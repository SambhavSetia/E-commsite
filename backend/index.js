const PORT=4000;
import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import { type } from 'os';

const app=express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://sambhavsetia29:ozrpzySTz87vmetM@cluster0.qman5.mongodb.net/e-commerce")


app.listen(PORT,(error)=>{
  if(!error){
    console.log(`Server Running on PORT http://localhost:${PORT}`);
  }
  else{
    console.log("Error in listen is :",error);
  }
})



app.get("/",(req,res)=>{
  res.send("Express app is running")
})

//Image Storage Engine
const storage= multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

  }
})


const upload = multer({
  storage: storage,
})




app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
res.json({
  success:1,
  image_url:`http://localhost:${PORT}/images/${req.file.filename}`
})
})


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


app.post('/removeproduct',async(req,res)=>{
  
  const deletedProduct = await Product.deleteOne({id:req.body.id});
  
console.log("Removed")
res.json({
    success: true,
    name:req.body.name
    
  });
})


app.get('/allproducts',async(req,res)=>{
let products=await Product.find({});
res.send(products)

console.log("ALL Products fetched")
})