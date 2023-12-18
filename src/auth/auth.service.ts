import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {AuthDto} from "./dto/auth.dto";
import {faker} from "@faker-js/faker";
import {JwtService} from "@nestjs/jwt";
import {response} from "express";
import {hash, verify} from "argon2";
import {User} from "@prisma/client";
import {ConfigService} from "@nestjs/config";
import {TokenDto} from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

    async register(dto: AuthDto) {
        try {
            const isUserExists = await this.prisma.user.findUnique({
                where: {email: dto.email}
            })

            if (isUserExists) throw new BadRequestException("User already exists")

            const user: User = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    password: await hash(dto.password),
                    phone: faker.phone.number(),
                    avatarPath: faker.image.avatar()
                }
            })

            const tokens = await this.getTokens(user)

            return {
                 user: this.getUserFields(user),
                ...tokens
            }
        } catch (e) {

        }
    }

    async updateProfile(dto) {
        const {refreshToken, ...rest} = dto
        const result = await this.jwtService.verifyAsync(refreshToken)

        if (!result) throw new UnauthorizedException("Refresh token is invalid...")

        if (rest.password) rest.password = await hash(rest.password)

        const user = await this.prisma.user.update({
            where: {
                id: result.id
            },
            data: {
                ...rest,
            },
        })

        const tokens = await this.getTokens(user)

        return {
            user: this.getUserFields(user),
            ...tokens
        }
    }

    async getNewTokens(dto: TokenDto) {
        const result = await this.jwtService.verifyAsync(dto.refreshToken)

        if (!result) throw new UnauthorizedException("Invalid refresh token")

        const user = await this.prisma.user.findUnique({
            where: {id: result.id}
        })

        const tokens = await this.getTokens(user)

        return {
            user: this.getUserFields(user),
            ...tokens
        }
    }

    async getAll() {
        return await this.prisma.user.findMany()
    }

    async login(dto: AuthDto) {
        try {
            const user = await this.validateUser(dto)
            console.log("LOGIN", user)


            const tokens = await this.getTokens(user)

            return {
                user: this.getUserFields(user),
                ...tokens
            }
        } catch (e) {
        throw new UnauthorizedException(e)
        }
    }

    private getUserFields(user: User): {email: string, id: number, isAdmin: boolean} {
        return {email: user.email, id:  user.id, isAdmin: user.isAdmin}

    }
    private async getTokens(user: User){
        const data = {id: user.id, email: user.email, isAdmin: user.isAdmin}
        const accessToken = this.jwtService.sign(data, {expiresIn: "1h"})
        const refreshToken = this.jwtService.sign(data, {expiresIn: "15m"})
        return {accessToken, refreshToken}
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new NotFoundException("User not found")

        // const isValid = await verify(user.password, dto.password)
        //
        // if (!isValid) throw new UnauthorizedException("Invalid password")

        return user
    }

}
