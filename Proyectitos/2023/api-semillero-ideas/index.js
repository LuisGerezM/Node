const container = require("./src/startup/container");
const server = container.resolve("server");
const { MONGO_URI } = container.resolve("config");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.start())
  .catch(console.log);
