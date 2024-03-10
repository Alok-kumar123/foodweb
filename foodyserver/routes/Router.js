import express from 'express';
import user from '../model/user-schema.js';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fooditem from '../model/fooditem_schema.js';
import foodcateg from '../model/food_categ.js';
import Orders from '../model/Orders.js';
const jwtSec="Mynameisanthony";
const router=express.Router();

router.use(express.json());

router.post('/createuser',[
 body('email').isEmail(),
 body('name').isLength({min:5}),
 body('password').isLength({min:5}),   
], async(req,res)=>{
     
       const errors=validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       }
       const salt=await bcrypt.genSalt(10);
       let secPassword=await bcrypt.hash(req.body.password,salt);
    try {
        
       await user.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,

        })
        res.json({success:true});
        console.log('New account created successfully')
    } catch (error) {
        console.log('Error while creating account', error.message);
        res.json({success:false});
    }
})

router.post('/loginuser',[
    body('email').isEmail(),
    body('password').isLength({min:5}),   
   ],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
    }

    const Email=req.body.email;
     
    try {
       const userdata= await user.find({email:Email});
       if(!userdata){
        return res.status(400).json({errors:"Try Login with correct email"});
       }
       const pwdCompare=await bcrypt.compare(req.body.password,userdata[0].password);
       if(!pwdCompare){
        return res.status(400).json({errors:"Try Login with correct credentials"});
       } 

       const data={
        User:{
            id:userdata[0]._id
        }
       }

       const authToken=jwt.sign(data,jwtSec);
       return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post('/fooddata',async(req,res)=>{

    try {
        const Fooditems=await fooditem.find({});
        const FoodCat=await foodcateg.find({});
        const responseData = {
            foodItems: Fooditems,
            foodCategories: FoodCat
        };
        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eId=await Orders.findOne({'email':req.body.email})
    console.log(eId);
    if(eId===null){
        try {
            await Orders.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Erro",error.message)
        }
    }
    else{
        try {
            await Orders.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
            res.send("server Error",error.message)
        }
    }
})

router.post('/myorderData',async(req,res)=>{
    try {
        let myData=await Orders.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.send("Server Error",error.message);
    }
})
export default router;