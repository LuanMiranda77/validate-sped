import jsPDF from "jspdf";
import { generateID } from "..";

export const convertHTMLToPDF = (elementoHTML, nameDoc) => {
    const pdf = new jsPDF({
      orientation:'p',
      format: 'a4',
      unit: 'px',
      margins: { top: 10, bottom: 10, left: 10, right: 10 },
      // compress:true,
      
  }); // 'p' para retrato, 'l' para paisagem

  // Defina as margens
  const margin = 10;
  // pdf.setMargins(margin, margin, margin, margin);

  // pdf.scaleFactor =  0.95;

  // Adicione o HTML ao documento PDF
  pdf.html(elementoHTML, {
    callback: function (doc) {
      // Salve ou exiba o PDF
      // doc.autoPrint({variant: 'non-conform'});
      doc.save(nameDoc + "-" + generateID() + ".pdf");
    },
    // margin: { top: margin, right: margin, bottom: margin, left: margin },
  });
  // const pdf = new jsPDF({
  //     format: 'a4',
  //     unit: 'px',
  // });
    // Use o método addHTML para converter o elemento HTML para PDF
  //   pdf.html(elementoHTML, {
  //     callback(doc) {
  //         doc.save(nameDoc + "-" + generateID() + ".pdf");
  //     },
  // });

  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  // const docDefinition = { content: [{ text: html, style: "body" }] };
  // pdfMake
  //   .createPdf(docDefinition)
  //   .download(nameDoc + "-" + generateID() + ".pdf");
};
