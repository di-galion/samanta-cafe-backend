import {ArrayMinSize, IsArray, IsEmail, IsString} from "class-validator";
import {Prisma} from "@prisma/client";


export class CreateOrderDto {
    @ArrayMinSize(1)
    products: IOrderItem[]
    deliveryDate: string
    deliveryTime: string

    @IsEmail()
    email: string
    @IsString()
    tel: string
    @IsString()
    name: string

    street?: string
    house?: string
    entrance?:  string
    floor?:  string
    room?: string
    key?: string
    comment?: string

    cafeName: string

    deliveryVariant: string
    total: number
}

export class IOrderItem {
    name: string
    quantity: number
    price: number
    productId: number
}
