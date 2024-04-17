import React from "react";
import { routesApp } from "../../routes/app.routes";
import ButtonMenu from "../Buttons/ButtonMenu";
import { Container, MenuContainer } from "./styles";

export const MainFooter: React.FC = () => {
  return (
    <Container>
      <MenuContainer>
        {routesApp.map(
          (route) =>
            route.path != "*" &&
            route.path != "/" && <ButtonMenu  label={route.name} icon={route.icon} link={route.path} />
        )}
      </MenuContainer>
    </Container>
  );
};
