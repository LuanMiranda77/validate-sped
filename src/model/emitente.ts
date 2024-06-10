export interface Erros {
  [chave: string]: number;
}
export class Emitente {
  name: string;
  cnpj: string;
  regime: string;
  erros: Erros;

  constructor() {
    this.name = "";
    this.cnpj = "";
    this.regime = "";
    this.erros = {};
  }
}
