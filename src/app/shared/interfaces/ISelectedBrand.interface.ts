import { Brand } from "../../core/models/Brand.model";

export type ISelectBrand = Pick<Brand, "id" | "name">;
