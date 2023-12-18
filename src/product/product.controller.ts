import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode} from '@nestjs/common';
import { ProductService } from './product.service';
import {ProductDto} from "./dto/product.dto";
import {Auth} from "../auth/decorators/auth.decorator";
import {Role} from "../auth/interfaces/auth.interface";
import {Product} from "@prisma/client";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @HttpCode(200)
  @Get("/:filterCategory/:filterSearch/:sort/:page/:perPage")
  findAll(@Param() params: ProductDto) {
    console.log("GET_ALL_PRODUCTS")
    return this.productService.findAll(params);
  }

  @Auth(Role.ADMIN)
  @HttpCode(200)
  @Post("/create")
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @Get("by-slug/:slug")
  getBySlug(@Param("slug") slug: string) {
    return this.productService.getBySlug(slug)
  }

  @Get("similar/:id")
  getSimilar(@Param("id") id: string) {
    return this.productService.getSimilar(+id)
  }

  @Auth(Role.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: Partial<Product>) {
    return this.productService.update(+id, dto)
  }


}
