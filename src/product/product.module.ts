import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {CategoryService} from "../category/category.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, JwtService, CategoryService],
})
export class ProductModule {}
