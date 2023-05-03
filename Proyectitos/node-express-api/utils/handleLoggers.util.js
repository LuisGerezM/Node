const fs = require("fs");
const path = require("path");
const { IncomingWebhook } = require("@slack/webhook");

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
  write: (message) => {
    webHook.send({
      text: message,
    });
  },
};

const log = fs.createWriteStream(path.join(__dirname, "/../logs", "login.log"), { flags: "a" });

const logsNoLogin = fs.createWriteStream(path.join(__dirname, "/../logs", "express.log"), { flags: "a" });

module.exports = { loggerStream, log, logsNoLogin };
