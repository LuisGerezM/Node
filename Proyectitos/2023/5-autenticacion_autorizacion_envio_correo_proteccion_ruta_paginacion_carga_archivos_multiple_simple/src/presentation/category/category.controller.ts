import { Request, Response } from "express";
import {
  CreateCategoryDto,
  CustomError,
  HandleErrorUseCase,
  PaginationDto,
} from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest(`${error}`),
        res
      );

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };

  getCategory = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest(`${error}`),
        res
      );

    this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };
}
