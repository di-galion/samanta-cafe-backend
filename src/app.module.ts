import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SailsModule } from './sails/sails.module';
import { UserModule } from './user/user.module';
import config from "./config/configuration"

@Module({
  imports: [ConfigModule.forRoot({load: [config], isGlobal: true}), AuthModule, OrdersModule, ProductModule, CategoryModule, SailsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
