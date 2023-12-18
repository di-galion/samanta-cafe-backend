import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "../prisma.service";
import e from "express";

@Injectable()
export class UserService {

  constructor(readonly prisma: PrismaService) {
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async getProfile(id: number) {
    console.log("PROFILE")
    return  this.prisma.user.findUnique({where: {id}},)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
