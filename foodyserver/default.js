import fooditem from "./model/fooditem_schema.js";
import { fooditems } from "./constants/fooditems.js";
import foodcategory from "./constants/foodcateg.js";
import foodcateg from "./model/food_categ.js";

const defaultData=async()=>{
    try { 
        await foodcateg.deleteMany({});
        await foodcateg.insertMany(foodcategory);
        await fooditem.insertMany(fooditems);
        console.log('data inserted successfully');
    } catch (error) {
        console.log('Error while inserting fooddata',error.message);
    }
}

export default defaultData;