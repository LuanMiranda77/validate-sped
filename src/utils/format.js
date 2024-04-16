import moment from 'moment';

export const formatMoney = (amount, decimalCount = 2, decimal = ',', thousands = '.') => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};

export const formatDateYYYYDDMM = (currentDate) => {
  return currentDate.toISOString().split('T')[0];
};

export const formatDateTime = (currentDate) => {
  return currentDate.toISOString();
};

export const formatDateToYYYYMMDD = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

export const formatDateTimeToYYYYMMDD_HHmmss = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const localDate = (date) => {
  // Criando um objeto Date
const dataAtual = new Date();

// Obtendo o deslocamento do fuso horário local em relação ao UTC em minutos
const offsetLocal = dataAtual.getTimezoneOffset();

// Obtendo o deslocamento do fuso horário do Brasil em relação ao UTC em minutos (-180 para Horário de Brasília)
const offsetBrasil = -0;

// Calculando a diferença entre o fuso horário local e o fuso horário do Brasil
const diferencaFusos = offsetBrasil - offsetLocal;

// Aplicando a diferença ao objeto Date para ajustar o fuso horário para o Brasil
const dataBrasil = new Date(dataAtual.getTime() + (diferencaFusos * 60 * 1000));

  return dataBrasil;
};

export const formatPrice = (text) => {
  // return value.toFixed(2).replace('.', ',');
  // Remove caracteres não numéricos e converte para número
  const numericValue = parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

  // Formata o valor com duas casas decimais e substitui ponto por vírgula
  const formattedValue = numericValue.toFixed(2).replace('.', ',');

  // Adiciona um zero à esquerda se o valor for menor que 1
  const finalValue = formattedValue < 1 ? `0${formattedValue}` : formattedValue;

  return finalValue;
};
