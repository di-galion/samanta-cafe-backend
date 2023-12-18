import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import * as process from "process";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user} = context.switchToHttp().getRequest();

        if (!user.isAdmin) {
            throw new ForbiddenException("You do not have rights");
        }

        return user.isAdmin
    }
}