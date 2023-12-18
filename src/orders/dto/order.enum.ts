export enum EnumOrderStatus {
    NOT_CONFIRMED = "не подтверждено",
    GETTING_READY = "готовится",
    WAITING_FOR_CLIENT = "ожидает клиента",
    IN_DELIVERY = "в доставке",
    REJECTED = "отменен",
}

export enum EnumOrderOrderBy {
    NEWEST = "asc",
    OLDEST = "desc"
}