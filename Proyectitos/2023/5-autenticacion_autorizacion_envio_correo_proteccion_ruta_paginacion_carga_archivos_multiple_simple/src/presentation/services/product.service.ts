import { envs } from "../../config";
import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExists) throw CustomError.badRequest("Product already exists");

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product;
    } catch (error) {
      console.log("\x1b[31m", `${error}`);
      throw CustomError.internalServer();
    }
  }

  async getProduct(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [amountProducts, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      const next =
        limit * page >= amountProducts
          ? null
          : `${envs.WEBSERVICE_URL}/products?page=${page + 1}&limit=${limit}`;

      const prev =
        page - 1 === 0
          ? null
          : `${envs.WEBSERVICE_URL}/products?page=${page - 1}&limit=${limit}`;

      return {
        page,
        limit,
        amountProducts,
        next,
        prev,
        products,
      };
    } catch (error) {
      console.log("\x1b[31m", `${error}`);
      throw CustomError.internalServer();
    }
  }
}
