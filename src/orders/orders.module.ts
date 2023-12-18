import {MiddlewareConsumer, Module, NestModule, RequestMethod, UseInterceptors} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {PrismaService} from "../prisma.service";;
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwt.config";
import {CheckUserAuth} from "./interceptors/check-auth.interceptor"
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ]
})

@UseInterceptors(CheckUserAuth)
export class OrdersModule {}
// export class OrdersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer
//         .apply(CheckUserAuth)
//         .forRoutes({path: "/order", method: RequestMethod.POST})
//   }
// }
