const mongoose = require('mongoose');

const ConnectRateDB = () => {
  mongoose.connect(
    `own-stuff`,
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", function () {
    console.log(`Connected to MongoDB as user`);
  });
};

const rateSchema = new mongoose.Schema({
    name:String,
    experience:String,
    text:String,
    rec:String
})

const RateSchema = mongoose.model("review", rateSchema);

module.exports = {ConnectRateDB , RateSchema};

//user bad
