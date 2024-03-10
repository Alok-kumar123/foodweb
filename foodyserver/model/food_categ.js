import mongoose from "mongoose";

const FoodCateg=new mongoose.Schema({
    CategoryName:{
        type:String,
        unique:true,
         required:true}
         
})

const foodcateg=mongoose.model('foodcateg',FoodCateg);

export default foodcateg;