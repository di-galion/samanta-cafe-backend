import { Injectable } from '@nestjs/common';
import { CreateSailDto } from './dto/create-sail.dto';
import { UpdateSailDto } from './dto/update-sail.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class SailsService {

  constructor(private prisma: PrismaService) {
  }
  create(createSailDto: CreateSailDto) {
    console.log("CREATE", createSailDto)
    return this.prisma.sails.create({
      data: createSailDto
    })
  }

  findAll() {
    return `This action returns all sails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sail`;
  }

  update(id: number, updateSailDto: UpdateSailDto) {
    console.log("UPDATE", updateSailDto)
    return this.prisma.sails.update({
      where: {id},
      data: updateSailDto
    })
  }

  remove(id: number) {
    console.log("REMOVE", id)
    return this.prisma.sails.delete({
      where: {id}
    })
  }
}
