import moment from 'moment';
import { formatMoney } from '../format';
import { converterHTMLParaPDF, generateID, getEmpresa } from '..';
import g from '../../assets/logo-3.png'
import { logo64 } from '../enums/enumCollection';
import html2pdf from "html2pdf.js";

export const generatePDFToResumeFinance = async (data) => {
  const products = Object.keys(data.products);
  const empresa = getEmpresa();
  const font10='font-size:12px;';
  const font8='font-size:10px;';
  const flex='display:flex; justify-content:space-between; align-item:center;'
  const margin= "margin:-8px 2px 2px 2px;";

  let tabelaHTML = '<table style="width:100%; margin-top: 5px; border:1px solid black;border-spacing:2px;cell-spacing:0px; cell-padding:0px">';
    tabelaHTML += `<thead bgcolor="#8b8b8b" >
        <td style="${font8}"><p style="${margin}">Cliente</p></td>
        <td style="${font8}" align="center"><p style="${margin}">Pagamento</p></td>
        <td style="${font8}" align="right"><p style="${margin}">Valor  Bruto</p></td>
        <td style="${font8}" align="right"><p style="${margin}">Valor Desconto</p></td>
        <td style="${font8}" align="right"><p style="${margin}">Valor Liquído</p></td>
    </thead>`;
    // Corpo da tabela
    tabelaHTML += '<tbody>';
    data.orders.map((item, i) => {
        tabelaHTML += `<tr style='background:${i%2 != 0?'#d1d1d1':'#fff'}; font-size:10px; line-height:20px;'>
            <td  style="width: 45%;${font8}"><p style="${margin}">${item.client.name} - ${item.client.city}-${item.client.state}</p></td>
            <td align="center" style="width: 10%;${font8}"><p style="${margin}">${item.type_payment}</p></td>
            <td align="right" style="width: 15%;${font8}"><p style="${margin}">${formatMoney(item.total_amount)}</p></td>
            <td align="right" style="width: 15%;${font8}"><p style="${margin}">${formatMoney(item.total_amount - item.total_liquido)}</p></td>
            <td align="right" style="width: 15%;${font8}"><p style="${margin}">${formatMoney(item.total_liquido)}</p></td>
        </tr>`;
    })
    tabelaHTML += '</tbody>';
    tabelaHTML += '</table>';

  let citys=''
  data.citysFilter.map(item => {citys+=item+', '})
  let  ids=''
  data.ordersIds.map(id => {ids+=id+', '})
  const logoPath = 'https://i.imgur.com/TH3TcOl.png';
  const templateHtml = `
  <!DOCTYPE html>
  <html lang="en">   
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body style="padding: 30px;">
      <div style="width: 100%; border: 2px solid #000; padding: 5px;">
          <center style="${flex}">
              <img src="data:image/png;base64,${logo64}" width="60px" height="30px">
              <div aling="center" >
               <p style="margin: 0;font-size: 14px; font-weight: bold;"><u>${empresa.name}</u></p>
               <p style="${font8}">CNPJ:${empresa.cnpj.substr(0,2)}.${empresa.cnpj.substr(2,3)}.${empresa.cnpj.substr(5,3)}/${empresa.cnpj.substr(8,4)}-${empresa.cnpj.substr(12,2)}</p>
               <p style="${font8}">Endereço: ${empresa.andress} - ${empresa.bairro} - Cel:(${empresa.phone.substr(0,2)})${empresa.phone.substr(2,5)}-${empresa.phone.substr(5,4)}</p>
               <p style="${font8}">E-mail: ${empresa.email}</p>
             </div>
              <div>
                <p style="margin-bottom: 5px; ${font8}">Data Inicial: ${moment(data.dtIni).format("DD/MM/YYYY")}</p> 
                <p style="${font8}">Data Final: ${moment(data.dtFin).format("DD/MM/YYYY")}</p>
            </div>
          </center>
          
      </div>
      <div style="width: 100%; border: 2px solid #000; padding: 5px; margin-top: -2px;">
      <center style="margin-bottom: 10px;font-size: 10px;"><b><u>FINANCEIRO</u></b></center>
          <hr>
          <div style="d-flex" style="justify-content: center;">
              <div style="${font10}" style="width: 100%;">
              <table border="1" cellspacing="0" cellpadding='0' width="100%">
                    <tbody>
                    <tr style="border:1px solid black; line-height:20px;">
                        <td>
                            <p style="font-size: 10px; ${margin}">Cidades do resumo: ${citys}</p>
                        </td>
                    </tr>
                    <tr style="border:1px solid black; line-height:20px;">
                        <td>
                            <p style="font-size:10px; ${margin}">Pedidos: ${ids}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                ${tabelaHTML}
                  <table border="1" cellspacing="0" cellpadding='2' width="100%" style="margin-top: -2px;">
                    <tbody>
                    <tr style="border: 1px solid #000;line-height:20px">
                        <td align="center">
                            <p style="${margin}">
                            <p style="margin: 0;${font8}"><small>Quantidade Vendida</small></p>
                            <span style="${font10}">${data.vlrQuant_sale}</span>
                            </p>
                        </td>
                        <td align="right">
                        <p style="${margin}">
                            <p style="margin: 0;${font8}"><small>Valor Total Burto</small></p>
                            <span style="${font10}">R$ ${formatMoney(data.vlrPrice_sale)}</span>
                            </p>
                            </td>
                        <td align="right">
                        <p style="${margin}">
                            <p style="margin: 0;${font8}"><small>Total Desconto</small></p>
                            <span style="${font10}">R$ ${formatMoney(data.vlrDesc)}</span>
                            </p>
                            </td>
                        <td align="right">
                        <p style="${margin}">
                            <p style="margin: 0;${font8}"><small>Valor Total Liquído</small></p>
                            <span style="${font10}">R$ ${formatMoney(data.vlrAmount_liquido)}</span>
                            </p>
                            </td>
                    </tr>
                    </tbody>
                </table>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;

  const templateHtml2 = `<!DOCTYPE html>
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
   </style>    
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body style="padding: 30px;">
      <div style="width: 98%; border: 2px solid #000; padding: 5px;">
          <center class="d-flex justify-between">
          <img src="data:image/png;base64,${logo64}" width="100px" height="30px">
              <div aling="center">
               <p style="margin: 0;font-size: 18px; font-weight: bold;"><u>${empresa.name}</u></p>
               <p class="font-12">CNPJ:${empresa.cnpj.substr(0,2)}.${empresa.cnpj.substr(2,3)}.${empresa.cnpj.substr(5,3)}/${empresa.cnpj.substr(8,4)}-${empresa.cnpj.substr(12,2)}</p>
               <p class="font-12">Endereço: ${empresa.andress} - ${empresa.bairro} - Cel:(${empresa.phone.substr(0,2)})${empresa.phone.substr(2,5)}-${empresa.phone.substr(5,4)}</p>
               <p class="font-12">E-mail: ${empresa.email}</p>
             </div>
              <div>
                <p class="font-12 bold" style="margin-bottom: 10px;">Data Inicial: ${moment(data.dtIni).format("DD/MM/YYYY")}</p> 
                <p class="font-12 bold">Data Final: ${moment(data.dtFin).format("DD/MM/YYYY")}</p>
            </div>
          </center>
          
      </div>
      <div style="width: 98%; border: 2px solid #000; padding: 5px; margin-top: -2px;">
          <center style="margin: 10px"><b><u>RESUMO FINANCEIRO</u></b></center>
          <hr>
          <div class="d-flex" style="justify-content: center;">
              <div class="font-12" style="width: 100%;">
              <table border="1" cellspacing="0" cellpadding='0' width="100%">
                    <tbody>
                    <tr style="border:1px solid black; line-height:20px;">
                        <td>
                            <p style="font-size: 10px; ${margin}">Cidades do resumo: ${citys}</p>
                        </td>
                    </tr>
                    <tr style="border:1px solid black; line-height:20px;">
                        <td>
                            <p style="font-size:10px; ${margin}">Pedidos: ${ids}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                ${tabelaHTML}
                  <table border="1" cellspacing="0" cellpadding='2' width="100%" style="margin-top: -2px;">
                    <tbody>
                    <tr>
                        <td align="center">
                            <p style="margin: 0;"><small>Quantidade Total</small></p>
                            <span class="bold total-font">${data.vlrQuant_sale}</span>
                        </td>
                        <td align="center">
                            <p style="margin: 0;"><small>Peso</small></p>
                            <span class="bold total-font">${formatMoney(data.vlrWeight_sale)} kg</span>
                        </td>
                        <td align="right">
                            <p style="margin: 0;"><small>Valor Total</small></p>
                            <span class="bold total-font">R$ ${formatMoney(data.vlrPrice_sale)}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
  try {
    // converterHTMLParaPDF(templateHtml, 'Resumo-financeiro');
    const content = document.createElement("div");
    content.innerHTML = templateHtml2;

    const op = {
      margin: 10,
      filename: "Pedido-" + generateID() + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(op).from(content).output("dataurlnewwindow");
  } catch (error) {
    console.log('Erro na geração do arquivo:', error);
  }
};

