import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import * as process from "process";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class CheckUserAuth implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        try {
            if (token) {
                const payload = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: process.env.SECRET_KEY
                    }
                );
                request['user'] = payload;
            } else {
                request.user = undefined
            }
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const headers: Headers & {authorization?: string} = request.headers
        const [type, token] = headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined;
    }
}