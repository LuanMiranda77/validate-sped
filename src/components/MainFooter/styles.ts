import styled from "styled-components";

export const Container = styled.div`
  //adicionar stylos
  grid-area: MF;
  background-color: ${(props) => props.theme.colors.secondary};
  /* border-right: 1px solid ${(props) => props.theme.colors.gray}; */
  box-shadow: 0px 0px 8px 1px ${(props) => props.theme.colors.primary};
  transition: grid-template-columns 0.5s;
  max-height: 60px;

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
  /* padding: 0.5rem; */
  height: 100%;
  display: flex;
  justify-content:center;
  align-items: center;

  /* .btn-menu {
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
  } */
`;
