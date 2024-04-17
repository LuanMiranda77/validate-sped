import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    grid-area: MB;
    background:${props =>props.theme.colors.secondary};
    display: flex;
    align-items: center ;
    justify-content: space-between;
    text-align: right;
    padding: 0.5rem;
    max-height: 25px;
    font-size: 10px;
    /* border-bottom: 1px solid ${props =>props.theme.colors.gray}; */
    box-shadow:0px 6px 6px 1px rgba(0, 0, 0, 0.15);
    z-index: 5;
@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

