import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    grid-area: MH;
    background:${props =>props.theme.colors.primary};
    display: flex;
    align-items: center ;
    justify-content: space-between;
    text-align: right;
    padding: 0.9rem;
    /* border-bottom: 1px solid ${props =>props.theme.colors.gray}; */
    box-shadow: 8px 8px 8px 8px rgb(0,0,0,.15);
@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

