const mongoose = require("mongoose");
const mongoDB = " mongodb://127.0.0.1:27017/Foodizz";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
module.exports = mongoose;