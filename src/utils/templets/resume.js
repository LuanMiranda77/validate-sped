import moment from 'moment';
import { formatMoney } from '../format';
import { converterHTMLParaPDF, generateID, getEmpresa } from '..';
import html2pdf from 'html2pdf.js';
import logo from "../../assets/logo-3.png"
import jsPDF from 'jspdf';
import { logo64 } from '../enums/enumCollection';

export const generatePDFToResume = async (data) => {
    
    const products = Object.keys(data.products);
    const margin= "margin:-8px 2px 2px 2px";
    let tabelaHTML = '<table style="width:100%; margin-top: 5px; border:1px solid black;border-spacing:2px;cell-spacing:0px; cell-padding:0px">';
    tabelaHTML += `<thead bgcolor="#8b8b8b" style="padding-bottom:5px;vertical-align: middle">
        <tr style="font-size:14px; line-height:20px; padding:10px;cell-padding:5px">
            <td> <p style="${margin}">Produto</p></td>
            <td align="center"><p style="${margin}">Total</p></td>
        </tr>
    </thead>`;
    // Corpo da tabela
    tabelaHTML += '<tbody>';
    products.forEach((item,i) => {
        tabelaHTML += `<tr style='background:${i%2 != 0?'#d1d1d1':'#fff'};line-height:30px; font-size:14px;'>
        <td  style="width: 50%;font-size:14px; "><p style="${margin}">${item}</p></td>
        <td align="center" style="width: 10%;"><p style="${margin}">${data.products[item]}</p></td>
    </tr>`;
    });
    tabelaHTML += '</tbody>';
    tabelaHTML += '</table>';
        
  const empresa = getEmpresa();
  const logoPath = 'https://i.imgur.com/TH3TcOl.png';
  let citys=''
  data.citysFilter.map(item => {citys+=item+', '})
  let  ids=''
  data.ordersIds.map(id => {ids+= id+', '})

  const templateHtml2 = `
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
  <body style="padding: 30px;">
      <div style="width: 98%; border: 2px solid #000; padding: 5px;">
          <center class="d-flex justify-between">
              <img src="data:image/png;base64,${logo64}" width="100px" height="60px"/>
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
          <center style="margin: 10px"><b><u>RESUMO DA ENTREGA</u></b></center>
          <hr>
          <div class="d-flex" style="justify-content: center;">
              <div class="font-12" style="width: 100%;">
              <table border="1" cellspacing="0" cellpadding='0' width="100%">
                    <tbody>
                    <tr style="border:1px solid black; line-height:25px;">
                        <td>
                            <p style="font-size: 12px; ${margin}">Cidades do resumo: ${citys}</p>
                        </td>
                    </tr>
                    <tr style="border:1px solid black; line-height:25px;">
                        <td>
                            <p style="font-size:12px; ${margin}">Pedidos: ${ids}</p>
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
    // const pdf = new jsPDF('p', 'px', 'a4');
    // pdf.html(templateHtml, {
    //     margin: [10, 10, 10, 10],
    //     x: 7,
    //     y: 7,
    //   callback: (pdf) => {
    //     // pdf.save('Resumo.pdf');
    //     pdf.output('dataurlnewwindow');
    //   },
    // });
    const content = document.createElement("div");
    content.innerHTML = templateHtml2;

    const op = {
      margin: 10,
      filename: "Resumo-" + generateID() + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(op).from(content).output("dataurlnewwindow");
  } catch (error) {
    console.log('Erro na geração do arquivo:', error);
  }
};
