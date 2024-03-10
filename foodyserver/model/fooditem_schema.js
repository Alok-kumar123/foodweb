import mongoose from "mongoose";

const FoodSchema=new mongoose.Schema({
    CategoryName:String,
        name:{
            type:String,
            unique:true,
            required:true
        },
        img:String,
        options:Object,
        
        description:String
})

const fooditem=mongoose.model('fooditem',FoodSchema);

export default fooditem;