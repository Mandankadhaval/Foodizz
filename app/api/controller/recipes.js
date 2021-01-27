const recipeModel = require("../models/recipes");
const { response } = require("express");
const paginate = require('express-paginate');
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports = {
    insertrecipe:function (req, response, next  ) {
        var UserId=req.body.UserId
        var title=req.body.title
        var ingredients=req.body.ingredients
        var description=req.body.directions
        var keyword=req.body.keyword
        var type=req.body.type
        var containrecipe=req.body.containrecipe
        var samplefile=req.files.recipeImage
        var videopath=[] 
        var filepath=[]
        if(containrecipe==="true")
        {
          var sampleVideo=req.files.video
            sampleVideo.forEach(element => {
              
              videopath.push(element.path)
            });
        }else{
            videopath[0]=null
        }       
        samplefile.forEach(element => {
              
              filepath.push(element.path)
        });
       
        if(title==="" || ingredients==="" ||description===""|| keyword==="" || type==="" || containrecipe==="" || samplefile==="" )
        {
            res.json( {status: "Error", message : "field have no value"})
        }
        recipeModel.create(
        {
            UserId:UserId,
            title:title,
            ingredients:ingredients,
            directions:description,
            keyword:keyword,
            type:type,
            containrecipe:containrecipe,
            image:filepath,
            recipeVideo:videopath[0], 
        },
        function (err, res) {
          if (err) next(err);
          else
            response.json({
              status: "success",
              data: res,
            });
        }
      );
    },

    allrecipe: async (req, response, next) =>{
        try {
          const [ results, itemCount ] = await Promise.all([
            recipeModel.find({}).sort({_id:-1}).limit(req.query.limit).skip(req.skip).lean().exec(),
            recipeModel.countDocuments({})
          ]);
          const pageCount = Math.ceil(itemCount / req.query.limit);
             response.json({
              status: 'success',
              has_more: paginate.hasNextPages(req)(pageCount),
              data: results
            });
          }
           catch (err) {
          next(err);
        }
      },

    updaterecipe:function(req,response,next){
      recipeModel.findById(req.params.Id,function(err,res)
            {
              if (err) {
                next(err);
              }
              else {
                var paths=res.recipeVideo
                fs.unlinkSync(paths)
                var images=[]
                images=res.image
                images.forEach(element=>{
                  fs.unlinkSync(element)
                })
              
              } 
            })  
        var samplefile=req.files.recipeImage
        var sampleVideo=req.files.video
        var filepath=[]
        var videopath=[]
        samplefile.forEach(element => {
            filepath.push(element.path)
        });
        sampleVideo.forEach(element => {
            videopath.push(element.path)
        }); 
        recipeModel.findByIdAndUpdate(
            req.params.Id,
            {        
                title:req.body.title,
                ingredients:req.body.ingredients,
                description:req.body.description,
                keyword:req.body.keyword,
                type:req.body.type,
                containrecipe:req.body.containrecipe,
                image:filepath,
                recipeVideo:videopath[0],
            },
            {new: true})
            .then(recipe => {
            if(!recipe) 
            {
                response.json({
                    status: "recipe not found with id " + req.params.id
                });
            }
            response.json({status:"success",data:recipe});
            })
            
       
    },
    findonerecipe: function (req, response, next) {
        recipeModel.findById(req.params.Id, function (err,res) {
          if (err) {
            next(err);
          } else {
            response.json({
              status: "success",
              data: res,
            });
          }
        });
      },  
    deleterecipe:function(req,response,next)
      {
          recipeModel.findByIdAndRemove(req.params.Id,function(err,res){
              if(err){
                  next(err);
              }
              else{
                  response.json({
                      status:"success",
                      data:"Recipe deleted successfully!!!"
                  })
              }
          })
      },
      GetByUserId:function(req,response,next)
      {
         recipeModel.find({UserId:req.params.Id},function(err,res)
         {
            if(err){
                next(err);
            }
            else
            {
                if(res!=null)
                {
                    response.json
                    ({
                        status:"success",
                        data:res
                    })
                }
                else
                {
                    response.json
                    ({
                        status:"Fail",
                        data:"no data available"
                    })
                }
            }
         }) 
      },
}

