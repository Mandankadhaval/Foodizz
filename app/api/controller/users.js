const UserModel = require("../models/users");
const { response } = require("express");
const multer=require('multer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const saltRounds = 10;
module.exports = {
    insertUser:function (req, response, next) {
        UserModel.create(
        {
            Email:req.body.Email,
            Password:req.body.Password,
            City:req.body.City,
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
    login:function(req,response,next)
    {
        UserModel.findOne({"Email": new Object(req.body.Email)},function(err,result){
            if (err) {
                next(err);
              }
              else
              {  
                
                if(result != null &&bcrypt.compareSync(req.body.Password, result.Password))
                {
                    const token = jwt.sign(
                            { id: result._id },
                            req.app.get("secretKey"),
                            { expiresIn: "24h" }
                          );  
                        response.json({
                            status: "success",
                            message: "user found!!!",
                            token:token,
                            })
                }
                else
                {
                    response.json({
                        status: "Fail",
                        message: "user Not found!!!",
                        })
                }
        }
    })

  }
}

