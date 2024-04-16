import styled from "styled-components";

export const Container = styled.div`
  //adicionar stylos
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.secondary};
  /* border-right: 1px solid ${(props) => props.theme.colors.gray}; */
  box-shadow: 8px 8px 8px 8px rgb(0,0,0,.15);
  transition: grid-template-columns 0.5s;

  @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const MenuContainer = styled.nav`
  padding: 0.5rem;
  height: 100%;
  cursor: pointer;

  .btn-menu {
    color: ${(color) =>
      color.theme.title === "dark"
        ? color.theme.colors.textLabel
        : color.theme.colors.primary};
    font-size: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-left: 15px;
    transition: all 0.5s;
    transform: translateY(0px);
    & :hover {
      transform: translateY(-2px);
    }
  }
`;
