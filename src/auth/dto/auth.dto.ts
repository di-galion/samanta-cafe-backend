import {IsEmail, MinLength} from "class-validator";

export class AuthDto {
    name: string

    @IsEmail()
    email: string

    @MinLength(6, {
        message: "Passport must includes 6 symbols"
    })
    password: string
}

