import React from "react";
import InputFile from "../../components/Inputs/InputFile";
import { ProgressBar } from "../../components/ProgressBar";
import useHome from "../../hooks/useHome";

// import { Container } from './styles';

const Home: React.FC = () => {
  const { handleFileChange, progress, emitente, file } = useHome();
  // const [progress, setProgress] = React.useState(10);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div className="w-full">
      <InputFile onChange={handleFileChange} valeu={file} />
      {progress > 0 && <ProgressBar value={progress} />}
      {progress === 100 && (
        <fieldset>
          <legend className="font-bold text-2xl">Resumo dos Erros:</legend>
          <hr />
          <div>
            <p>CNPJ: {emitente.cnpj}</p>
            <label>Empresa: {emitente.name}</label>
            <hr />
            <p className="font-bold text-xl">Lista de erros</p>
            {Object.keys(emitente.erros).map((key, i) => (
              <div key={i}>
                <p>Cod: {key}</p>
                <span>Quantidade: {emitente.erros[key]}</span>
              </div>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default Home;
