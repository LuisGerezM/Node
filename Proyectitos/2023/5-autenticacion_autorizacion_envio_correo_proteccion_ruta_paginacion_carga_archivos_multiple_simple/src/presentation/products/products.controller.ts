import { Request, Response } from "express";
import {
  CreateProductDto,
  CustomError,
  HandleErrorUseCase,
  PaginationDto,
} from "../../domain";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  createProduct = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest(`${error}`),
        res
      );

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest(`${error}`),
        res
      );

    this.productService
      .getProduct(paginationDto!)
      .then((products) => res.json(products))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };
}
