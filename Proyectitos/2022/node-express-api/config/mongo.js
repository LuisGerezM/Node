const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

class DBConnect {
  #DB_URI = process.env.DB_URI;

  constructor() {
    if (DBConnect.instance) {
      return DBConnect.instance;
    }
    this.connection = this.createConnection();
    DBConnect.instance = this;
  }

  createConnection() {
    return mongoose.connect(
      this.#DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, res) => {
        if (!err) console.log("******* CONEXION CORRECTA *****");
        else console.log("******* ERROR DE CONEXION *****");
      }
    );
  }
}

module.exports = DBConnect;
