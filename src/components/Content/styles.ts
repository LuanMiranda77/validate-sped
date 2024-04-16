import styled from "styled-components";

export const Container  = styled.div`
    //adicionar stylos
    grid-area: CT;
    background:${props => props.theme.colors.background};
    padding: 25px;

    height:calc(100vh -50px);
    overflow-y:auto;

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

