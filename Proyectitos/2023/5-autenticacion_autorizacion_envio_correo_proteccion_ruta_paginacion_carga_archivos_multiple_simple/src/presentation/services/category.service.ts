import { envs } from "../../config";
import { CategoryModel } from "../../data";
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists) throw CustomError.badRequest("Category already exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      console.log("\x1b[31m", `${error}`);
      throw CustomError.internalServer();
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [amountCategories, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      const next =
        limit * page >= amountCategories
          ? null
          : `${envs.WEBSERVICE_URL}/category?page=${page + 1}&limit=${limit}`;

      const prev =
        page - 1 === 0
          ? null
          : `${envs.WEBSERVICE_URL}/category?page=${page - 1}&limit=${limit}`;

      return {
        page,
        limit,
        amountCategories,
        next,
        prev,
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
        })),
      };
    } catch (error) {
      console.log("\x1b[31m", `${error}`);
      throw CustomError.internalServer();
    }
  }
}
