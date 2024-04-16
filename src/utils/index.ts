import axios from "axios";
import jsPDF from "jspdf";
import moment from "moment";

export const getDayInitial = () => {
  return moment(new Date()).startOf("month");
};

export const findAddressByCEP = async (cep: string) => {
  try {
    let dado = { cep: "", andress: "", city: "", bairro: "", state: "" };
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;
    dado.cep = data["cep"];
    dado.andress = data["logradouro"];
    dado.city = data["localidade"];
    dado.bairro = data["bairro"];
    dado.state = data["uf"];
    return dado;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

export async function findClientByCNPJ(cnpj: string) {
  const apiURL = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
  let client = {
    cnpj: "",
    razao: "",
    cep: "",
    phone: "",
    andress: "",
    city: "",
    bairro: "",
    state: "",
  };
  try {
    const response = await axios.get(apiURL);
    const data = response.data; // Dados da resposta da API

    client.cnpj = data["cnpj"];
    client.razao = data["razao_social"];
    client.cep = data["cep"];
    client.phone = data["ddd_telefone_1"];
    client.andress = data["logradouro"] + ", " + data["numero"];
    client.city = data["municipio"];
    client.bairro = data["bairro"];
    client.state = data["uf"];
    return client;
  } catch (error) {
    console.log("Erro ao buscar cliente:", error);
  }
}

export function removeMask(value: string) {
  // Remove qualquer caractere que não seja número
  const cleaned = value.replace(/\D/g, "");
  return cleaned;
}

// export const convertToOrderProducto = (product:ProductType, index:number, isDuplicate: boolean) => {
//   let prod = initialProduct;
//   prod._id = isDuplicate ? null : product.id;
//   prod.id = product.product.id;
//   prod.cod = index + 1;
//   prod.name = product.name_product;
//   prod.price = product.price_sale;
//   (prod.quantitySale = product.quant_sale),
//     (prod.quantity = product.product.quantity);
//   prod.liter = product.product.liter;
//   prod.fragrance = product.product.fragrance;
//   prod.deleted = product.product.deleted;
//   prod.dateCreated = product.product.dateCreated;
//   prod.dateUpdated = product.product.dateUpdated;
//   prod.idDoc = isDuplicate ? null : product.idDoc;
//   return prod;
// };

export function generateID() {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString().slice(-2); // Obtém os últimos dois dígitos do ano
  const month = currentDate.getMonth() + 1; // Mês (adiciona um para compensar o índice base zero)
  const day = currentDate.getDate(); // Dia
  const hours = currentDate.getHours(); // Hora (formato 24 horas)
  const minutes = currentDate.getMinutes(); // Minutos
  const seconds = currentDate.getSeconds(); // Segundos

  const orderID = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return orderID;
}

export const converterHTMLParaPDF = (htmlString: any, nameDoc: string) => {
  const pdf = new jsPDF("p", "px", "a4");
  pdf.html(htmlString, {
    margin: [10, 10, 10, 10],
    x: 7,
    y: 7,
    callback: (pdf) => {
      // pdf.save(nameDoc + "-" + generateID() + ".pdf");
      pdf.output("dataurlnewwindow");
    },
  });
};

export const getEmpresa = () => {
  let emp = localStorage.getItem("@empresa");
  if (emp) {
    emp = JSON.parse(emp);
  }
  return emp;
};

export const setEmpresa = (empresa: any) => {
  localStorage.setItem("@empresa", JSON.stringify(empresa));
};

export const isElectron = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf(' electron/') !== -1;
};
