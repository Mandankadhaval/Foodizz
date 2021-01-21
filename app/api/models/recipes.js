const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    UserId:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    ingredients:[{
        type:String,required:true
    }],
    directions:{
        type:String,
        required:true,
    },
    keyword:[{
       type:String,required:true
    }],
    type:[{
         type:String
    }],
    containrecipe:{
        type:Boolean,
        required:true
    },
    image:[{
        type:String, required:true
    }],
    recipeVideo:{
        type:String,require:false
    },
    
});

module.exports = mongoose.model("recipe", recipeSchema);
