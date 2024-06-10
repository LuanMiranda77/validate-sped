// import { Container } from './styles';

import { saveAs } from "file-saver";
import { ChangeEvent, useState } from "react";
import { Emitente, Erros } from "../model/emitente";

function useHome() {
  const [file, setFile] = useState<File | null>(null);
  const [fileString, setFileString] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [emitente, setEmitente] = useState(new Emitente());
  const initialValue = { TOTAL: 0 };
  let erros: Erros = initialValue;

  function corretionH0200(line: String, valueLine: String) {
    const value = line.split("|");
    value[4] = "";
    erros["0200"] = erros["0200"] ? (erros["0200"] += 1) : 1;
    erros["TOTAL"] = erros["TOTAL"] += 1;
    return value.join("|");
  }

  function corretionH0220(line: String, valueLine: String) {
    const value = line.split("|");
    value[4] = "";
    erros["0220"] = erros["0220"] ? (erros["0220"] += 1) : 1;
    erros["TOTAL"] = erros["TOTAL"] += 1;
    return value.join("|");
  }

  function corretionC170(line: String, valueLine: String, products: Array<String>) {
    const codInvet = line.split("|")[3];
    const prod = products.find((productLine) => productLine.split("|")[2] === codInvet);
    const med = prod?.split("|")[6];
    const codipi = line.split("|")[20];
    const codCstipi = line.split("|")[25];
    const codConfis = line.split("|")[31];

    const value = line.split("|");
    if (med) {
      value[6] = med;
      erros["C170"] = erros["C170"] ? (erros["C170"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    if (codipi == "99" || codipi == "50") {
      value[20] = "";
      erros["C170"] = erros["C170"] ? (erros["C170"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    if (codCstipi == "99" || codCstipi == "50") {
      value[25] = "";
      erros["C170"] = erros["C170"] ? (erros["C170"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    if (codConfis == "99" || codConfis == "50") {
      value[31] = "";
      erros["C170"] = erros["C170"] ? (erros["C170"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    return value.join("|");
    // console.log(valueLine);
  }

  function corretionC173(line: String, valueLine: String) {
    const value = line.split("|");

    if (value[6] == "-1") {
      value[6] = "1";
      erros["C173"] = erros["C173"] ? (erros["C173"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    if (value[7] == "-1") {
      value[7] = "1";
      erros["C173"] = erros["C173"] ? (erros["C173"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    if (value[8] == "") {
      value[8] = "1";
      erros["C173"] = erros["C173"] ? (erros["C173"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    return value.join("|");
  }

  function corretionC190(line: String, valueLine: String) {
    const cfop = line.split("|")[3];
    const value = line.split("|");

    if (cfop == "5102") {
      value[2] = "102";
      erros["C190"] = erros["C190"] ? (erros["C190"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    if (cfop == "5405") {
      value[2] = "500";
      erros["C190"] = erros["C190"] ? (erros["C190"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
    }
    return value.join("|");
  }

  function corretionH010(line: String, valueLine: String, products: Array<String>) {
    const codInvet = line.split("|")[2];
    const prod = products.find((productLine) => productLine.split("|")[2] === codInvet);
    const med = prod?.split("|")[6];

    if (med) {
      const value = line.split("|");
      value[3] = med;
      erros["H010"] = erros["H010"] ? (erros["H010"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
      return value.join("|");
    }
    return valueLine;
  }

  function corretionH005(line: String, valueLine: String, products: Array<String>) {
    const codInvet = line.split("|")[2];
    const prod = products.find((productLine) => productLine.split("|")[2] === codInvet);
    const med = prod?.split("|")[6];

    if (med) {
      const value = line.split("|");
      value[3] = med;
      erros["H005"] = erros["H005"] ? (erros["H005"] += 1) : 1;
      erros["TOTAL"] = erros["TOTAL"] += 1;
      return value.join("|");
    }
    return valueLine;
  }

  const corrigirErros = (content: Array<String>) => {
    const products = content.filter((line) => line.substring(0, 6) == "|0200|");

    for (let i = 0; i < content.length; i++) {
      const line: String = content[i];

      // INI - ERROS DE CODIGO DE BARRAS
      if (line.substring(0, 6) === "|0200|") {
        content[i] = corretionH0200(line, content[i]);
      }

      if (line.substring(0, 6) === "|0220|") {
        content[i] = corretionH0220(line, content[i]);
      }
      // END -

      // ERROS DE UNIDADE DIVERGENTES E IPI, COFINS
      if (line.substring(0, 6) === "|C170|") {
        content[i] = corretionC170(line, content[i], products);
      }
      // END -

      // ERRO DE  VALORES NEGATIVO -1
      if (line.substring(0, 6) === "|C173|") {
        content[i] = corretionC173(line, content[i]);
      }
      // END -

      // ERROS DE CFOP
      if (line.substring(0, 6) === "|C190|") {
        content[i] = corretionC190(line, content[i]);
      }

      // ERROS DE INVENTARIO H005
      // if (line.substring(0, 6) === "|H001|" && content[i + 1].substring(0, 6) != "|H005|") {
      //   content[i] = corretionH005(line, content[i], products);
      // }
      // END -

      // ERROS DE UNIDADE NO ARQUIVO H010
      if (line.substring(0, 6) === "|H010|") {
        content[i] = corretionH010(line, content[i], products);
      }
      // END -

      setTimeout(() => {
        const temp = ((i + 1) / content.length) * 100;
        setProgress(temp);
      }, 100);
    }

    let lines = content.join("\n");
    return lines;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    let empresa = "";

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.readAsText(selectedFile, "UTF-8");
      // reader.readAsBinaryString(selectedFile, 'UTF-8');
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        // console.log( e.target);
        // Aqui você pode processar o conteúdo do arquivo, corrigir erros, etc.
        // Processar o conteúdo do arquivo linha por linha
        const lines = fileContent.split("\n");
        empresa = lines[0];
        setFileString(lines);
        // setEmitente({ ...emitente, cnpj: empresa.split("|")[7], name: empresa.split("|")[6], erros: erros });
        setEmitente({ ...emitente, cnpj: empresa.split("|")[7], name: empresa.split("|")[6], erros: initialValue });
        // Salvar o arquivo corrigido
        // const blob = new Blob([correctedContent], {
        //   type: "text/plain;charset=utf-8",
        // });

        // saveAs(blob, `${selectedFile.name.replaceAll(".txt", "")}-CORRIGIDO.txt`);
      };
      
    }
  };

  const executeCorretion = () => {
    const correctedContent = corrigirErros(fileString);
    console.log(correctedContent, fileString)
    setEmitente({ ...emitente, erros: erros });
    const blob = new Blob([correctedContent], {
      type: "text/plain;charset=utf-8",
    });

    setTimeout(() => {
      saveAs(blob, `${file?.name.replaceAll(".txt", "")}-CORRIGIDO.txt`);
    }, 700);
  };

  return {
    handleFileChange,
    progress,
    emitente,
    file,
    executeCorretion,
  };
}

export default useHome;
