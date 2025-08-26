import { Footwear } from "./Footwear.model";

export type CartItem = Pick<Footwear, "id" | "name" | "price"> & {
  quantity: number;
}