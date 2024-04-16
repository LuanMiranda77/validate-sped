import { localDate } from "../utils/format";
import { ClientType, initialClient } from "./Client";

export type OrderSaleType = {
  id: string;
  code: string;
  client: ClientType;
  city_sale: string;
  quantity_sale: number;
  weight: number; //peso
  total_amount: number;
  descont: number;
  total_liquido: number;
  type_payment: string;
  observation: string;
  dateCreated: Date;
  dateUpdated: Date;
  deleted: number;
  idDoc: string;
  products?: [];
};

export const initialOrderSale: OrderSaleType = {
  id: "",
  code: "",
  client: initialClient,
  city_sale: "",
  quantity_sale: 0,
  weight: 0, //peso
  total_amount: 0,
  descont: 0,
  total_liquido: 0,
  type_payment: "",
  observation: "",
  dateCreated: localDate(),
  dateUpdated: localDate(),
  deleted: 0,
  idDoc: "",
};
