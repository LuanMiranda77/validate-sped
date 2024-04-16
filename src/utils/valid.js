export class Valid {
  static isValidNenorIdade = (ano) => {
    return parseInt(new Date().getFullYear()) - parseInt(ano) < 12 ? false : true;
  };

  static isValidDateNasc = (dia, mes, ano) => {
    return parseInt(dia) > 31 ||
      parseInt(mes) > 12 ||
      parseInt(ano) < 1950 ||
      (parseInt(dia) > 29 && parseInt(mes) == 2) ||
      ano >= new Date().getFullYear()
      ? false
      : true;
  };
}

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

// Função para validar CNPJ
export function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14)
        return false;

    var tamanhoTotal = cnpj.length - 2
    var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    var digitosVerificadores = cnpj.substring(tamanhoTotal);
    var soma = 0;
    var pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;

    return true;35
}

// Função para validar CPF
export function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais, o que invalida o CPF
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
}

