import { saveAs } from "file-saver";
import React, { ChangeEvent, useState } from "react";

interface Iprops {
  valeu: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputFile: React.FC<Iprops> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        // Aqui você pode processar o conteúdo do arquivo, corrigir erros, etc.
        // Processar o conteúdo do arquivo linha por linha
        const lines = fileContent.split("\n");
        const emitente = lines[0];

        // Unir as linhas corrigidas de volta em um único texto
        const correctedContent = corrigirErros(lines);

        // Salvar o arquivo corrigido
        const blob = new Blob([correctedContent], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `SPED ${emitente.split("|")[6]} CORRIGIDO.txt`);
      };

      reader.readAsText(selectedFile);
    }
  };

  const corrigirErros = (content: Array<String>) => {
    const products = content.filter((line) => line.substring(0, 6) == "|0200|");

    for (let i = 0; i < content.length; i++) {
      const line = content[i];
      // if (line.substring(0, 6) === "|H001|" && content[i+1].substring(0, 6)!= '|H005|') {
      //   const codInvet = line.split("|")[2];
      //   const prod = products.find((productLine) => productLine.split("|")[2] === codInvet);
      //   const med = prod?.split("|")[6];

      //   if (med) {
      //     const value = line.split("|");
      //     value[3] = med;
      //     content[i] = value.join("|");
      //   }
      // }

      // INI - ERROS DE CODIGO DE BARRAS
      if (line.substring(0, 6) === "|0200|") {
        const value = line.split("|");
        value[4] = "";
        content[i] = value.join("|");
      }

      if (line.substring(0, 6) === "|0220|") {
        const value = line.split("|");
        value[4] = "";
        content[i] = value.join("|");
      }
      // END -

      // ERROS DE UNIDADE DIVERGENTES E IPI, COFINS
      if (line.substring(0, 6) === "|C170|") {
        const codInvet = line.split("|")[3];
        const prod = products.find((productLine) => productLine.split("|")[2] === codInvet);
        const med = prod?.split("|")[6];
        const codipi = line.split("|")[20];
        const codCstipi = line.split("|")[25];
        const codConfis = line.split("|")[31];

        const value = line.split("|");
        if (med) {
          value[6] = med;
        }

        if (codipi == "99" || codipi == "50") {
          value[20] = "";
        }
        if (codCstipi == "99" || codCstipi == "50") {
          value[25] = "";
        }
        if (codConfis == "99" || codConfis == "50") {
          value[31] = "";
        }

        content[i] = value.join("|");
      }
      // END -

      // ERRO DE  VALORES NEGATIVO -1
      if (line.substring(0, 6) === "|C173|") {
        const value = line.split("|");
        if (value[6] == "-1") {
          value[6] = "1";
        }
        if (value[7] == "-1") {
          value[7] = "1";
        }
        if (value[8] == "") {
          value[8] = "1";
        }
        content[i] = value.join("|");
      }
      // END -
      // ERROS DE CFOP
      if (line.substring(0, 6) === "|C190|") {
        const cfop = line.split("|")[3];

        const value = line.split("|");
        if (cfop == "5102") {
          value[2] = "102";
        }
        if (cfop == "5405") {
          value[2] = "500";
        }
        content[i] = value.join("|");
      }

      // ERROS DE UNIDADE NO ARQUIVO H010
      if (line.substring(0, 6) === "|H010|") {
        const codInvet = line.split("|")[2];
        const prod = products.find((productLine) => productLine.split("|")[2] === codInvet);
        const med = prod?.split("|")[6];

        if (med) {
          const value = line.split("|");
          value[3] = med;
          content[i] = value.join("|");
        }
      }
      // END -

      setTimeout(() => {
        const temp = ((i + 1) / 100) * 100;
        setProgress(temp);
      }, 100);
    }

    let lines = content.join("\n");
    return lines;
  };

  return <input type="file" onChange={onChange} />;
};
export default InputFile;
