const express = require("express");
const router = express.Router();
const recipeController = require("../app/api/controller/recipes");
var cheakauth=require('../auth')
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname==="recipeImage")
        {
            cb(null,'imageupload/')
        }
        if(file.fieldname==="video")
        {
            cb(null,'videouploads/')
        }
    },
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(/:/g,"-") + file.originalname)
    },
  });
  
  const fileFilter=(req, file, cb)=>{
    if(file.fieldname==="recipeImage")
    {
        if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png')
        {
            cb(null,true);
        }
        else
        {
            cb(null, false);
        }
    }
    if(file.fieldname==="video")
    {
        if(file.mimetype ==='video/mp4' || file.mimetype ==='video/mov' || file.mimetype ==='video/avi' || file.mimetype ==='video/mkv')
        {
            cb(null,true);
        }
        else
        {
            cb(null, false);
        } 
    }
 
   }
var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 200
    },
    fileFilter:fileFilter
 });


router.post("/AddRecipe",upload.fields([{name:'recipeImage',maxCount:5},{name:'video',maxCount:1}]),recipeController.insertrecipe);
router.get('/AllRecipe',recipeController.allrecipe)
router.get("/",recipeController.allrecipe)
router.put("/updaterecipe/:Id",cheakauth,upload.fields([{name:'recipeImage',maxCount:5},{name:'video',maxCount:1}]), recipeController.updaterecipe);
router.get("/FindById/:Id",cheakauth, recipeController.findonerecipe);
router.delete("/DeleteRecipe/:Id",cheakauth,recipeController.deleterecipe);
router.get("/GetByUserId/:Id",cheakauth,recipeController.GetByUserId);
module.exports = router;