const ENGINE_DB = process.env.ENGINE_DB;

const pathModelsFolder = ENGINE_DB === "nosql" ? "./no-sql" : "./mysql";
const pathModelsExtension = ENGINE_DB === "nosql" ? ".no-sql" : ".sql";

const models = {
  usersModel: require(`${pathModelsFolder}/users${pathModelsExtension}`),
  tracksModel: require(`${pathModelsFolder}/tracks${pathModelsExtension}`),
  storageModel: require(`${pathModelsFolder}/storage${pathModelsExtension}`),
};

module.exports = models;
