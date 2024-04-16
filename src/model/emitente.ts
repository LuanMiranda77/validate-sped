export interface Erros {
  [chave: string]: string;
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
