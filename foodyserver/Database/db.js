import mongoose from "mongoose";

export const Connection= async(URL)=>{

//const url='mongodb://localhost:27017/?tls=false&appName=Flipkart';
    try{
       await mongoose.connect(URL)
       console.log('Connected to Db Successfully');
    } catch(error){
        console.log('Error while connecting with Database',error.message);
    }
}

export default Connection