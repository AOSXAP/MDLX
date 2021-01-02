const mongoose = require("mongoose");

Schema = mongoose.Schema;

const member = new mongoose.Schema({
    user_id: { type: String, unique: false },
    guild_id: { type: String, unique: false },
    user_name: { type: String, unique: false, default: undefined },
    xp: { type: Number, default: null },
    level: { type: Number, default: null },
})

const members = mongoose.model('members', member)

const ConnectUserDB = () => {
  mongoose.connect(
    `mongodb+srv://VZZE:VvVz%23eE3%25%23%405%25%232DFREcvEDw%23%232ssfFRrDD%25%5E2%403-@cluster.8lzpu.mongodb.net/database?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", function () {
    console.log(`Connected to MongoDB as boss`);
  });
};

module.exports = { members: members, ConnectUserDB };