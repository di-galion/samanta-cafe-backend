export class ProductDto {
    perPage?: string | number
    page?: string | number
    sort?: EnumProductSort
    filterSearch?: string
    filterCategory?: string
}

export enum EnumProductSort {
    LOW_PRICE = "low_price",
    HIGH_PRICE = 'high_price',
    OLDEST = 'oldest',
    NEWEST = "newest"
}