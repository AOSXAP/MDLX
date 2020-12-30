const mongoose = require('mongoose');

const ConnectRateDB = () => {
  mongoose.connect(
    `mongodb+srv://andrei:lostxap2004@cluster0.5hqnb.mongodb.net/auth?retryWrites=true&w=majority`,
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
    text:String
})

const RateSchema = mongoose.model("review", rateSchema);

module.exports = {ConnectRateDB , RateSchema};

//user bad