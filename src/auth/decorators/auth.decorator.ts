import {applyDecorators, UseGuards} from '@nestjs/common';
import {Role} from "../interfaces/auth.interface";
import {AuthGuard} from "../guards/auth.guard";
import {AdminGuard} from "../guards/admin.guard";

export function Auth(role: Role = Role.USER) {
    // console.log("AUTH DECORATOR", role)
    return applyDecorators(
        role === Role.USER ?
            UseGuards(AuthGuard) :
            UseGuards(AuthGuard, AdminGuard)
    );
}