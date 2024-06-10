import React from "react";
import { ButtonBase } from "../../components";
import InputFile from "../../components/Inputs/InputFile";
import { ProgressBar } from "../../components/ProgressBar";
import useHome from "../../hooks/useHome";

// import { Container } from './styles';

const Home: React.FC = () => {
  const { handleFileChange, executeCorretion, progress, emitente, file } = useHome();

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <InputFile onChange={handleFileChange} value={file} />
        <ButtonBase
          label="Corrigir"
          model="btn_base"
          className="btn primary-color px-10 mt-2"
          size="large"
          onClick={executeCorretion}
        />
      </div>
      {progress > 0 && <ProgressBar value={progress} />}
      {progress === 100 && (
        <fieldset>
          <legend className="font-bold text-2xl">Resumo dos Erros Corrigidos</legend>
          <hr />
          <div>
            <p>CNPJ: {emitente.cnpj}</p>
            <label>Empresa: {emitente.name}</label>
            <hr />
            <p className="font-bold text-xl">Lista de erros</p>
            {Object.keys(emitente.erros).map((key, i) => {
              return (
                key !== "TOTAL" && (
                  <div key={i} className="p-1">
                    <strong>Cod:</strong> {key} → {emitente.erros[key]}
                  </div>
                )
              );
            })}
            <hr />
            <span className="font-bold text-xl">Total de erros corrigido: {emitente.erros["TOTAL"]}</span>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default Home;
