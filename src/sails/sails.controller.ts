import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SailsService } from './sails.service';
import { CreateSailDto } from './dto/create-sail.dto';
import { UpdateSailDto } from './dto/update-sail.dto';

@Controller('sails')
export class SailsController {
  constructor(private readonly sailsService: SailsService) {}

  @Post()
  create(@Body() createSailDto: CreateSailDto) {
    return this.sailsService.create(createSailDto);
  }

  @Get()
  findAll() {
    return this.sailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSailDto: UpdateSailDto) {
    return this.sailsService.update(+id, updateSailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sailsService.remove(+id);
  }
}
