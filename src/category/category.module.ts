import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {PrismaService} from "../prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwt.config";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtStrategy],
  exports: [CategoryService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ]
})
export class CategoryModule {}
