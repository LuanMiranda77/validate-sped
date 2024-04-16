import { generateID } from "../utils";
import { localDate } from "../utils/format";

export type ProductType = {
  id: string;
  name: string;
  quantity: number;
  fragrance: string;
  price: number;
  liter: number;
  dateCreated: Date;
  dateUpdated: Date;
  deleted: number;
  idDoc: string;
};

export const initialProduct: ProductType = {
  id: generateID(),
  name: "",
  quantity: 0,
  fragrance: "",
  price: 0,
  liter: 0,
  dateCreated: localDate(),
  dateUpdated: localDate(),
  deleted: 0,
  idDoc: "",
};
