import {EnumProductSort} from "../../product/dto/product.dto";

export class GetAllCategoryDto {
    perPage?: string | number
    page?: string | number
    sort?: EnumProductSort
    filterSearch?: string
}