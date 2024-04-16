import { v4 as uuidv4 } from "uuid";
import { localDate } from "../utils/format";

export type OrderProductType = {
  id: string;
  order_sales: string;
  product: string;
  name_client: string;
  name_product: string;
  quant_sale: number;
  price_sale: number;
  weight_sale: number; //peso vendido
  idDoc: string;
  dateCreated: Date;
  dateUpdated: Date;
};

export const initalOrderProduct: OrderProductType = {
  id: uuidv4(),
  order_sales: "",
  product: "",
  name_client: "",
  name_product: "",
  quant_sale: 0,
  price_sale: 0,
  weight_sale: 0, //peso vendido
  idDoc: "",
  dateCreated: localDate(),
  dateUpdated: localDate(),
};
