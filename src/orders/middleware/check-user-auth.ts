import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {JwtService} from "@nestjs/jwt";
import process from "process";

@Injectable()
export class CheckUserAuth implements NestMiddleware {
    constructor(private jwt: JwtService) {
    }
    async use(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers)
        const [type, token ] = req.headers.authorization?.split(" ")
        if (type === "Bearer" && token) {
            const payload = this.jwt.verifyAsync(token, {
                secret: process.env.SECRET_KEY
            })
            req["user"] = payload
        }
        next();
    }
}
