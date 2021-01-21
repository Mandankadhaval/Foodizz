const mongoose = require("mongoose");
const util = require("util");
var formidable = require('formidable');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        index: {
            unique: true, 
        },
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    Password:{
        type:String,
        required:true,
    },
    City:{
        type:String,
        required:true
    },
});
userSchema.pre("save", function (next) {
    this.Password = bcrypt.hashSync(this.Password, saltRounds);
    next();
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
