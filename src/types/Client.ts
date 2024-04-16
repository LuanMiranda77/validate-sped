import { generateID } from "../utils";
import { localDate } from "../utils/format";

export type ClientType = {
  id: string;
  cnpj: string;
  inscState: string;
  razao: string;
  name: string;
  cep: string;
  andress: string;
  bairro: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  dateCreated: Date;
  dateUpdated: Date;
  deleted: number;
  idDoc: string;
};

export const initialClient: ClientType = {
  id: generateID(),
  cnpj: '',
  inscState: '',
  razao: '',
  name: '',
  cep: '',
  andress: '',
  bairro: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  dateCreated: localDate(),
  dateUpdated: localDate(),
  deleted: 0,
  idDoc: '',
};

