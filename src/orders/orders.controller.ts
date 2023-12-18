import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors, HttpCode
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

import {CheckUserAuth} from "./quards/check-user-auth";
import {Auth} from "../auth/decorators/auth.decorator";
import {Role} from "../auth/interfaces/auth.interface";
import {Order} from "@prisma/client";
import {OrderSortDto} from "./dto/order-sort.dto";

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards(CheckUserAuth)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @HttpCode(200)
  @Auth(Role.ADMIN)
  @Get("/:filterSearch/:filterStatus/:sort/:page/:perPage")
  findAll(@Param() params: OrderSortDto) {
    return this.ordersService.findAll(params);
  }

  @HttpCode(200)
  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @HttpCode(200)
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Order>) {
    return this.ordersService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
