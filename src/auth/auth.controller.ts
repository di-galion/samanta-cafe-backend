import {Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDto} from "./dto/auth.dto";
import {AuthGuard} from "./guards/auth.guard";
import {TokenDto} from "./dto/refresh-token.dto";
import {User} from "@prisma/client";
import {Auth} from "./decorators/auth.decorator";
import {Role} from "./interfaces/auth.interface";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("register")
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }

  @Get()
  // @Auth(Role.ADMIN)
  async getAll() {
    return this.authService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('tokens')
  async getNewTokens(@Body() dto: TokenDto) {
    return this.authService.getNewTokens(dto)
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Auth(Role.USER)
  @Post('update')
  async updateProfile(@Body() dto: TokenDto & Partial<User>) {
    return this.authService.updateProfile(dto)
  }



  //@UseGuards(AuthGuard)
  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: AuthDto) {
    console.log("LOGIN", dto)
    return this.authService.login(dto)
  }


}
