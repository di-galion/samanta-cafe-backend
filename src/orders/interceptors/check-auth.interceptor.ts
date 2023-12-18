import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import process from "process";

@Injectable()
export class CheckUserAuth implements NestInterceptor {
    constructor(private jwt: JwtService) {}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        console.log("In interceptor")
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (token) {
            const payload = await this.jwt.verifyAsync(token, {
                secret: process.env.SECRET_KEY
            })
            request.user = payload
        } else {
            request.user = null
        }
        console.log("token:", token)

        return next.handle().pipe();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const headers: Headers & {authorization?: string} = request.headers
        const [type, token] = headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined;
    }
}