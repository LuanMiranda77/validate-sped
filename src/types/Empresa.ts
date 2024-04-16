import { localDate } from "../utils/format";

export type Empresa = {
  id: number;
  cnpj: string;
  razao: string;
  name: string;
  cep: string;
  andress: string;
  bairro: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  token_google: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateBkp: Date;
  idDoc: string;
};

export const initialEmpresa: Empresa = {
  id: 1,
  cnpj: "",
  razao: "",
  name: "",
  cep: "",
  andress: "",
  bairro: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  token_google: "",
  dateCreated: localDate(),
  dateUpdated: localDate(),
  dateBkp: localDate(),
  idDoc: "",
};
