import { envs } from "../../config";
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModel,
} from "../mongo";
import { seedData } from "./data";

(async () => {
  if (envs.IS_PROD) return;

  try {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect();
  } catch (error) {
    console.log("\x1b[31m", `${error}`);
  }
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  const users = await UserModel.insertMany(seedData.usersSEED);

  const categories = await CategoryModel.insertMany(
    seedData.categoriesSEED.map((category) => {
      return {
        ...category,
        user: users[0]._id,
      };
    })
  );

  const products = await ProductModel.insertMany(
    seedData.productsSEED.map((product) => {
      return {
        ...product,
        user: users[randomBetween0AndX(seedData.usersSEED.length - 1)]._id,
        category:
          categories[randomBetween0AndX(seedData.categoriesSEED.length - 1)]
            ._id,
      };
    })
  );

  console.log("\x1b[36m", "SEEDED");
}
