import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport"
import {AuthService} from "./auth.service";
import {Strategy} from "passport-local"
import {ExtractJwt} from "passport-jwt";
import * as process from "process";
import {PrismaService} from "../prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prisma: PrismaService) {
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: process.env.SECRET_KEY,
            }
        );
    }

    async validate({id}: {id: string}) {
        return this.prisma.user.findUnique({
            where: {
                id: +id
            }
        })
    }
}