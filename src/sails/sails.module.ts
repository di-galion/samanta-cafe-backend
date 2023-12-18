import { Module } from '@nestjs/common';
import { SailsService } from './sails.service';
import { SailsController } from './sails.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [SailsController],
  providers: [SailsService, PrismaService],
})
export class SailsModule {}
