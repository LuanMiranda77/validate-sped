import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
  //variaveis do tema de cores
  --background: #1C1C1C;
  --white: #FFF;
  --text-label: #fff;
 


  //variaveis de tamanho
  --max-height-button:30px;
}

*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

html{
  @media (max-width: 1080px){
    font-size: 14px;
  }
  @media (max-width: 720px){
    font-size: 14px;
  }
}

body {
  background: var(--background);
  -webkit-font-smoothing: antialiased;
}

body, input, textarea, button{
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

h1,h2,h3,h4,h5,h6 strong{
  font-weight: 700;
}

button {
  cursor: pointer;
}

table, thead {
   max-height: 20px !important;
   height: 20px !important;
  }


.table-print{

  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 8px;
  }

  th, td {
    border: .05px solid black;
    border-collapse: collapse;
    padding-top: -10px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 8px;
    page-break-before: always;
  }


}

@media print {
      body {
        background-color: #fff; /* Fundo branco para a impressão */
        color: #000; /* Texto preto para a impressão */
      }

      .no-imprimir {
        display: none; /* Esconde elementos com a classe .no-imprimir na impressão */
      }

      .quebra-de-pagina {
        padding-top: 30px;
        page-break-before: always; /* Força a quebra de página antes do elemento com a classe .quebra-de-pagina */
      }
}

.font-8{
  font-size: 8px;
}

.font-9{
  font-size: 9px;
}

.font-10{
  font-size: 10px;
}

[disabled]{
  opacity: 0.6;
  cursor: not-allowed;
}
.react-modal-overlay{
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

}

.card-local{
  background: var(--white);
  /* margin: 2%; */
  border-radius: 5px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.15);
}

.react-modal-content{
  width: 100%;
  max-width: 70rem;
  background-color: var(--background);
  padding: 1.5rem;
  position: relative;
  border-radius: 0.24rem;
}
.react-modal-close{
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  border: 0;
  transition: filter 0.2s;
  &:hover{
    filter:brightness(0.9);
  }
  @media (max-width: 720px){
    right: 3rem;
  }
}

::-webkit-scrollbar{
        width:7px;
        margin-right:5px
    }

    ::-webkit-scrollbar-thumb{
        background-color:${props => props.theme.colors.primary};
        border-radius:5px;
    }

    ::-webkit-scrollbar-track{
        background-color:transparent;
        border-radius:5px;
        margin:1rem;
    }

`