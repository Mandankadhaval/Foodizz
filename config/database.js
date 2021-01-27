const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://Mandankadhaval:Welcome@123@cluster0.c4qc1.mongodb.net/food?retryWrites=true&w=majority"
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
