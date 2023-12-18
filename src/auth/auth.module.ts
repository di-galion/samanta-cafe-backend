import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PrismaService} from "../prisma.service";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwt.config";

@Module({
  controllers: [ AuthController],
  providers: [AuthService, PrismaService,  JwtStrategy],
  imports: [
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getJwtConfig
      }),
  ]
})
export class AuthModule {}
