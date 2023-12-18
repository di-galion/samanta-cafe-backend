import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as timers from "timers";
import {Prisma, PrismaClient} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import {tr} from "@faker-js/faker";
import {returnProductDto} from "../product/dto/return-product.dto";
import {ReturnOrderDto} from "../orders/dto/return-ordre.dto";
import {ReturnCategoryDto} from "./dto/return-category.dto";
import {EnumOrderOrderBy} from "../orders/dto/order.enum";
import {NO_FILTER} from "../constants/constants";

@Injectable()
export class CategoryService {

  constructor(
      private prisma: PrismaService
  ) {}

  async findById(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id: id
      },
      select: {id: true, name: true, slug:true}
    })
  }

  async update(id, dto) {
    console.log("DTO", dto)
    return this.prisma.category.update({
      where: {
        id: id
      },
      data: dto
    })
  }

  async bySlug(slug: string) {
    console.log("GET BY slug", slug)
    return this.prisma.category.findUnique({
      where: {
        slug: slug
      },
      select: {products: true, id: true, name: true, slug: true}
    })
  }

  async create(dto) {
    console.log("DTO", dto)
    return this.prisma.category.create({
      data: dto,
      select: {products: true, id: true, name: true, slug: true}
    })
  }

  async getAll(dto){
    const {filterSearch, sort, page, perPage} = dto

    return this.prisma.category.findMany({
      where: this.createFilter(filterSearch),
      orderBy: this.createSort(sort),
      skip: this.createSkip(page, perPage),
      take: +perPage,
      select: ReturnCategoryDto
    })
  }

  private createSort(sort): Prisma.OrderOrderByWithRelationInput {
    switch (sort) {
      case EnumOrderOrderBy.NEWEST:
        return {createdAt: EnumOrderOrderBy.NEWEST}
      case EnumOrderOrderBy.OLDEST:
        return {createdAt: EnumOrderOrderBy.OLDEST}
    }
  }

  private createSkip(page, perPage) {
    return (+page - 1) * perPage
  }

  private createFilter(filter): Prisma.CategoryWhereInput {
    if (!filter || filter === NO_FILTER) return {}
    return {
      name: {
        contains: filter,
        mode: 'insensitive'
      },
    }
  }

}
