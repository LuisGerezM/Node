const { Sequelize } = require("sequelize");

class DBConnectMySQL {
  #database = process.env.MYSQL_DATABASE;
  #username = process.env.MYSQL_USER;
  #password = process.env.MYSQL_PASSWORD;
  #host = process.env.MYSQL_HOST;

  constructor() {
    if (DBConnectMySQL.instance) {
      return DBConnectMySQL.instance;
    }
    this.connection = this.createConnection();
    DBConnectMySQL.instance = this;
  }

  getInstanceSequelize() {
    return new Sequelize(this.#database, this.#username, this.#password, {
      host: this.#host,
      dialect: "mysql",
    });
  }

  createConnection() {
    return async () => {
      try {
        const sequelize = getInstanceSequelize();
        await sequelize.authenticate();
        console.log("MySQL conexión correcta");
      } catch (error) {
        console.log("MYSQL Error de Conexion", error);
      }
    };
  }
}

const sequelize = new DBConnectMySQL().getInstanceSequelize();

module.exports = { sequelize, DBConnectMySQL };
