import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {CurrentUser} from "../auth/decorators/user.decorator";
import {Auth} from "../auth/decorators/auth.decorator";
import {Role} from "../auth/interfaces/auth.interface";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth(Role.ADMIN)
  @Get("find")
  findAll() {
    return this.userService.findAll();
  }

  @HttpCode(200)
  @Auth()
  @Get('profile')
  getProfile(@CurrentUser("id") id: number) {
    return this.userService.getProfile(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
