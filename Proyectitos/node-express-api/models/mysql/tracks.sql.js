const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage.sql");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Implementing custom properties for model
 */

Tracks.findAllData = function () {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio-all",
  });

  return Tracks.findAll({ include: "audio-all" });
};

Tracks.findOneData = function (id, as = "audio") {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as,
  });

  return Tracks.findOne({ where: { id }, include: as });
};

Tracks.findOneAndUpdate = async function (id, body) {
  await Tracks.update(
    {
      name: body.name,
      album: body.album,
      cover: body.cover,
      mediaId: body.mediaId,
    },
    {
      where: id,
    }
  );

  return Tracks.findOneData(id.id, "up-audio");
};

module.exports = Tracks;
