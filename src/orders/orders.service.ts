import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import {PrismaService} from "../prisma.service";
import {ReturnOrderDto} from "./dto/return-ordre.dto";
import {request} from "express";
import {Prisma} from "@prisma/client";
import {EnumOrderOrderBy, EnumOrderStatus} from "./dto/order.enum";
import {DUMMY_USER_ID, NO_FILTER} from "../constants/constants";

@Injectable()
export class OrdersService {

  constructor(
      private readonly prisma: PrismaService
  ) {}

  async create(dto: CreateOrderDto) {
    const userId = request.user ? request.user : DUMMY_USER_ID

    return this.prisma.order.create({
      data: {
        email: dto.email,
        name: dto.name,
        tel: dto.tel,
        street: dto.street,
        house: dto.house,
        sails: {
          createMany: {
            data: dto.products,
          },
        },
        entrance: dto.entrance,
        floor: dto.floor,
        room: dto.room,
        key: dto.key,
        comment: dto.comment,
        cafeName: dto.cafeName,
        deliveryDate: dto.deliveryDate,
        deliveryTime: dto.deliveryTime,
        deliveryVariant: dto.deliveryVariant,
        user: {connect: {id: +userId}},
        total: dto.total,
        status: EnumOrderStatus.NOT_CONFIRMED
      }
    })
  }

  async findAll(dto) {
    const {
      perPage = 20,
      page = 1,
      filterSearch,
      filterStatus,
      sort = EnumOrderOrderBy.NEWEST
    } = dto
    console.log("GET_ALL_ORDERS", dto)
    const filter = this.createFilter({filterSearch, filterStatus})
    console.log("FILTER", filter)
    const orders = await this.prisma.order.findMany({
      where: filter,
      orderBy: this.createSort(sort),
      skip: this.createSkip(page, perPage),
      take: +perPage,
      select: ReturnOrderDto
    })
    console.log("ORDERS", orders)
    return orders
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

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: {id}
    })
  }

  private createFilter(filter): Prisma.OrderWhereInput {
    const filters = []
    if (filter.filterStatus !== NO_FILTER) {
      filters.push({
        status: filter.filterStatus
      })
    }

    if (filter.filterSearch !== NO_FILTER) {
      filters.push({
        OR: [
          {
            name: {
              contains: filter.filterSearch,
              mode: 'insensitive'
            },
          },
          {
            email: {
              contains: filter.filterSearch,
              mode: 'insensitive'
            },
          },
          {
            tel: {
              contains: filter.filterSearch,
              mode: 'insensitive'
            },
          },
          {
            street: {
              contains: filter.filterSearch,
              mode: 'insensitive'
            },
          },
        ]
      })
    }
    return filters.length ? {AND: filters} : {}
  }

  async update(id, dto) {
    const order = await this.prisma.order.update({
      where: {id},
      data: dto,
      select: ReturnOrderDto
    })
    return order
  }

  async remove(id: number) {
    await this.prisma.order.delete({where: {id}})
  }
}
