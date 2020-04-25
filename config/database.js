const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

class DbContext {
  static get conn() {
    if (!DbContext.connection) throw new Error("DbContext is not connected!");
    return DbContext.connection;
  }

  static connect() {
    DbContext.connection = mongoose.createConnection(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
}

module.exports = DbContext;
