const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const StoreSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

StoreSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("storages", StoreSchema);
