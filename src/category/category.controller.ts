import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {CategoryService} from './category.service';
import {Category} from "@prisma/client";
import {Auth} from "../auth/decorators/auth.decorator";
import {Role} from "../auth/interfaces/auth.interface";
import {GetAllCategoryDto} from "./dto/get-all-category.dto";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/:filterSearch/:sort/:page/:perPage")
  getAll(@Param() params: GetAllCategoryDto) {
    console.log("GET_ALL_CATEGORIES")
    return this.categoryService.getAll(params)
  }

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() dto: Partial<Category>) {
    return this.categoryService.create(dto)
  }

  @Get("/by-slug/:slug")
  bySlug(@Param("slug") slug: string) {
    return this.categoryService.bySlug(slug)
  }

  @Auth(Role.ADMIN)
  @Patch("/:id")
  update(@Param("id") id: string, @Body() dto: Partial<Category>) {
    return this.categoryService.update(+id, dto)
  }
  @Get("/:id")
  findById(@Param("id") id: number | string) {
    return this.categoryService.findById(+id)
  }
}
