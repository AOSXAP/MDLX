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
    `mongodb+srv://VZZE:VvVz#eE3%#@5%#2DFREcvEDw##2ssfFRrDD%^2@3-@cluster.8lzpu.mongodb.net/test`,
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", function () {
    console.log(`Connected to MongoDB as user`);
  });
};

ConnectUserDB();

module.exports = { members: members, ConnectUserDB };