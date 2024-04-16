import { collection, getDocs, query, where } from "firebase/firestore";
import html2pdf from "html2pdf.js";
import moment from "moment";
import { generateID, getEmpresa } from "..";
import { enumNameColection, logo64 } from "../enums/enumCollection";
import { firestore } from "../firebaseUtils";
import { formatMoney } from "../format";

export const generatePDFToOrderSale = async (order) => {
  const empresa = getEmpresa();
  let data = [];
  const orderProductsQuery = query(
    collection(firestore, enumNameColection.ORDER_PRODUCT),
    where("order_sales.id", "==", order.id)
  );
  const orderProducts = await getDocs(orderProductsQuery);
  orderProducts.docs.forEach((doc) => {
    const orderSale = doc.data();
    data.push(orderSale);
  });
  // let data = array;
  data = data.sort((a, b) => a.id - b.id);
  let dadosClient = order?.client;
  const font10 = "font-size:10px;";
  const font8 = "font-size:8px;";
  const flex = "display:flex; justify-content:space-between; align-item:center;";
  const margin = "margin:-8px 2px 2px 2px;";

  let tabelaHTML =
    `<table  width="100%" style="margin-top: 5px; border:1px solid black;border-spacing:2px;cell-spacing:0px; cell-padding:0px">`;
  tabelaHTML += `<thead bgcolor="#8b8b8b" >
  <tr style="line-height:20px;">
    <td align="center" style="width: 10%;font-weight: bold;"><p style="${margin}">Número</p></td>
    <td style="width: 60%;font-weight: bold;"><p style="${margin}">Produto</p></td>
    <td align="center" style="width: 10%; font-weight: bold;"><p style="${margin}">Qtde</p></td>
    <td align="right" style="width: 10%;font-weight: bold;"><p style="${margin}">Preço</p></td>
    <td align="right" style="width: 10%;font-weight: bold;"><p style="${margin}">Subtotal</p></td>
    </tr>
    </thead>`;
  // Corpo da tabela
  tabelaHTML += "<tbody>";
  data.map((item, i) => {
    tabelaHTML += `<tr style="background:${i % 2 != 0 ? "#d1d1d1" : "#fff"}; line-height:25px;">
            <td  align="center" style="width: 15px;"><p style="${margin}">${(i + 1).toString().padStart(2, "0")}</p></td>
            <td  style="width: 55%;"><p style="${margin}">${item.name_product}</p></td>
            <td align="center" style="width: 10%; "><p style="${margin}">${item.quant_sale}</p></td>
            <td align="right"  style="width: 10%;"><p style="${margin}">${formatMoney(item.price_sale)}</p></td>
            <td align="right" style="width: 10%; font-we
            ight: bold;"><p style="${margin}">${formatMoney(item.quant_sale * item.price_sale)}</p></td>
        </tr>`;
  });
  tabelaHTML += "</tbody>";
  tabelaHTML += "</table>";

  const logoPath = 'http://localhost:3000/assets/logo-3.png';
  const templateHtml = `
  <!DOCTYPE html>
<html lang="en">
 <style>
    .font-12{
        font-size: 12px;
        margin: 0;
    }
    .d-flex{
        display: flex; 
        direction: row;
    }
    .justify-between{
        justify-content: space-between;
    }
    .bold{
        font-weight: bold;
    }
    .total-font{
      font-size: 14px;
    }
 </style>    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="padding: 15px;">
    <div style="width: 98%; border: 2px solid #000; padding: 5px;">
        <center class="d-flex justify-between">
            <img src="data:image/png;base64,${logo64}" alt="" width="100px" height="60px">
            <div aling="center">
                <p style="margin: 0;font-size: 18px; font-weight: bold;"><u>${empresa.name}</u></p>
                <p class="font-12">CNPJ:${empresa.cnpj.substr(0, 2)}.${empresa.cnpj.substr(2, 3)}.${empresa.cnpj.substr(
    5,
    3
  )}/${empresa.cnpj.substr(8, 4)}-${empresa.cnpj.substr(12, 2)}</p>
                <p class="font-12">Endereço: ${empresa.andress} - ${empresa.bairro} - Cel:(${empresa.phone.substr(
    0,
    2
  )})${empresa.phone.substr(2, 5)}-${empresa.phone.substr(5, 4)}</p>
                <p class="font-12">E-mail: ${empresa.email}</p>
            </div>
            <div>
                <p style="margin: 0px 0px 0px 0">
                    <span style="font-size: 14px; font-weight: bold;">Nº </span>
                    <span style="color:red; font-size: 14px; font-weight: bold;">${order.id
                      .toString()
                      .padStart(3, "0")}</span>
                </p>
                <p class="font-12 bold">Data: ${moment(order.dataCreated).format("DD/MM/YYYY")}</p>
            </div>
        </center>
        
    </div>
    <div style="width: 98%; border: 2px solid #000; padding: 5px; margin-top: -2px;">
        <center style="margin: 5px"><b><u>PEDIDO DA COMPRA</u></b></center>
        <p class="font-12" style="margin: -10px 0px -8px 0"><b>Informações principais</b></p>
        <hr>
        <div style="display: flex; width: 100%;">
            <div class="font-12" style="width: 50%;">
                <p style="margin: 5px;"><b>Razão Social: </b>${
                  Boolean(order.client.razao) ? order.client.razao : ""
                }</p>
                <p style="margin: 5px;"><b>CNPJ/CPF: </b>${Boolean(order.client.cnpj) ? order.client.cnpj : ""}</p>
            </div>
            <div class="font-12"  style="width: 50%;">
                <p style="margin: 5px;"><b>Nome fantasia: </b>${order.client.name}</p>
                <p style="margin: 5px;"><b>Inscrição estadual: </b>${
                  Boolean(order.client.incricao) ? order.client.incricao : ""
                }</p>
            </div>
        </div>
        <div class="font-12" style="display: flex; width: 100%;">
            <div style="width: 50%;">
                <p style="margin: 5px;"><b>Endereço: </b>${
                  Boolean(order.client.andress) ? order.client.andress : ""
                }</p>
                <p style="margin: 5px;"><b>Cidade: </b>${
                  Boolean(order.client.city) ? order.client.city + "-" + order.client.state : ""
                }</p>
                <p style="margin: 5px;"><b>Tel: </b>${Boolean(order.client.phone) ? order.client.phone : ""}</p>
            </div>
            <div  style="width: 50%;">
                <p style="margin: 5px;"><b>CEP: </b>${Boolean(order.client.cep) ? order.client.cep : ""}</p>
                <p style="margin: 5px;"><b>Bairro: </b>${Boolean(order.client.bairro) ? order.client.bairro : ""}</p>
                <p style="margin: 5px;"><b>E-mail: </b>${Boolean(order.client.email) ? order.client.email : ""}</p>
            </div>
        </div>
    </div>
    <div class="font-12" style="width: 98%; border: 2px solid #000; padding: 5px; margin-top: -2px;">
        ${tabelaHTML}
        <table border="1" cellspacing="0" cellpadding='2' width="100%" style="margin-top: -2px;">
            <tbody>
            <tr>
                <td align="center">
                    <p style="margin: 0;"><small>Quantidade</small></p>
                    <span class="bold total-font">${order.quantity_sale}</span>
                </td>
                <td align="center">
                    <p style="margin: 0;"><small>Peso</small></p>
                    <span class="bold total-font">${formatMoney(order.weight)} kg</span>
                </td>
                <td align="right">
                    <p style="margin: 0;"><small>Valor Total</small></p>
                    <span class="bold total-font">R$ ${formatMoney(order.total_amount)}</span>
                </td>
                <td align="right">
                    <p style="margin: 0;"><small>Valor Desconto</small></p>
                    <span class="bold total-font">R$ ${formatMoney(order.total_amount - order.total_liquido)}</span>
                </td>
                <td align="right">
                    <p style="margin: 0;"><small>Valor Liquído</small></p>
                    <span class="bold total-font">R$ ${formatMoney(order.total_liquido)}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="font-12" style="width: 98%; border: 2px solid #000; padding: 5px; margin-top: -2px;">
        <table width="100%" height="100%" cellpadding='0'>
            <tr><b>Observações:</b></tr>
            <tr>
                <td>${Boolean(order.observation) ? order.observation : ""}</td>
            </tr>
        </table>
    </div>
</body>
</html>
  `;

  try {
    const content = document.createElement("div");
    content.innerHTML = templateHtml;

    const op = {
      margin: 10,
      filename: "Pedido-" + generateID() + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(op).from(content).output("dataurlnewwindow");
  } catch (error) {
    console.error("Erro na geração do arquivo:", error);
  }
};
