const dbContext = require("../config/database");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
});

module.exports = dbContext.conn.model("User", schema);
