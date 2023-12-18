import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {EnumProductSort, ProductDto} from "./dto/product.dto";
import Prisma from "prisma"
import {fi, tr} from "@faker-js/faker";
import {returnProductDto} from "./dto/return-product.dto";
import * as process from "process";
import {Product} from "@prisma/client";
import {CategoryService} from "../category/category.service";
import {getNoNullProperty} from "../utils/getNoNullProperty";
@Injectable()
export class ProductService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly categoryService: CategoryService
  ) {}

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      },
      select: returnProductDto
    })

    if (!product) throw  new NotFoundException(("Product not found"))
    // console.log("SLUG", product)
    return product
  }

  async create(dto) {
    const categoryName = dto.category.name
    delete dto.category

    const category = await this.prisma.category.findUnique({
      where: {name: categoryName}
    })
    
    return this.prisma.product.create({
      data: {...dto, category: {connect: {id: category.id}}}
    })
  }

  async getSimilar(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {id},
      select: {category: true}
    })

    if (product) throw new NotFoundException("Product not found")

    const similars = await this.prisma.product.findMany({
      where: {
        category: {
          name: product.category.name,
        },
        NOT: {id}
      },
      select: returnProductDto
    })


    return similars
  }

  async update(id, dto) {
    const categoryName = dto?.category?.name
    delete dto.category

    // console.log(categoryName)

    // console.log("DTO", dto)

    const formattedDto: Partial<Product> = getNoNullProperty(dto)
    // console.log("FORMATTED DTO", formattedDto)

    if (categoryName) {
      const category = await this.categoryService.bySlug(categoryName)
      console.log(category)
      formattedDto.categoryId = category.id
    }

    return this.prisma.product.update({
      where: {id},
      data: formattedDto
    })
  }

  async findAll(dto: ProductDto) {
    console.log("GET ALL PRODUCTS")
    const {
      perPage = 20,
      page = 1,
      sort = EnumProductSort.NEWEST,
      filterCategory,
      filterSearch
    } = dto
    const filters = this.createFilter({filterSearch, filterCategory})

    // console.log("DTO",dto)
    //
    // console.log("FILTER", !filters ? {} : filters, !filters ? {} : filters?.AND[0])

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.createSort(sort),
      skip: this.createSkip(page, perPage),
      take: +perPage,
      select: returnProductDto
    })

    // console.log("PRODUCTS", products.length)

    if (!products) throw new NotFoundException("Products not found")

    return products
  }

  private createSkip(page, perPage) {
    return (+page - 1) * perPage
  }
  private createFilter(filter): Prisma.ProductWhereInput {
    const filters = []

    if (!filter.filterSearch || filter.filterSearch !== "No filtration" ) {
      filters.push(
          {
            OR: [
              {
                name: {
                  contains: filter.filterSearch,
                  mode: 'insensitive'
                },
              },
              {
                description: {
                  contains: filter.filterSearch,
                  mode: 'insensitive'
                },
              },
            ]
          }
      )
    }

    if (!filter.filterCategory || filter.filterCategory !== "No filtration" ) {
      filters.push(
          {
            OR: [
              {
                category: {
                  name: {
                    contains: filter.filterCategory,
                    mode: 'insensitive'
                  }
                }
              }
            ]
          }
      )
    }

    console.log("FILTER FROM FiLTER", filters)

    return filters.length ? {AND: filters} : {}

}

  private createSort(sort): Prisma.ProductOrderByWithRelationInput {
    switch (sort) {
      case EnumProductSort.HIGH_PRICE:
        return [{price: "asc"}]
      case EnumProductSort.LOW_PRICE:
        return [{price: "desc"}]
      case EnumProductSort.OLDEST:
        return [{createdAt: "desc"}]
      case EnumProductSort.NEWEST:
        return [{createdAt: "asc"}]
    }
  }
}
