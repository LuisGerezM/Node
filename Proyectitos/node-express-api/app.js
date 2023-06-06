require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const DBConnect = require("./config/mongo");
const { DBConnectMySQL } = require("./config/mysql");

const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const { log, logsNoLogin, loggerStream } = require("./utils/handleLoggers.util");

morganBody(app, {
  noColors: true,
  stream: log,
  skip: function (req, res) {
    return req.url !== "/login"; //
  },
  filterParameters: ["Request"],
});

morganBody(app, {
  noColors: true,
  stream: logsNoLogin,
  skip: function (req, res) {
    return req.url === "/login"; //
  },
  filterParameters: ["Request"],
});

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

// Require routes
const indexRoutes = require("./routes/index.routes");

app.use("/api", indexRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Tu app esta esjecutandose en el puerto ${3002}`);
});

ENGINE_DB === "nosql" ? new DBConnect() : new DBConnectMySQL();
