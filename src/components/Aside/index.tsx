import React from "react";
import { routesApp } from "../../routes/app.routes";
import ButtonMenu from "../Buttons/ButtonMenu";
import { Container, MenuContainer } from "./styles";

export const Aside: React.FC = () => {
  return (
    <Container>
      <MenuContainer>
        {routesApp.map(
          (route) =>
            route.path != "*" &&
            route.path != "/" && <ButtonMenu label={route.name} icon={route.icon} link={route.path} />
        )}
        {/* <ButtonMenu label="Caixa" icon={<FaCashRegister className="btn-menu" />} link="/caixa" />
        <ButtonMenu label="Financeiro" icon={<RiMoneyDollarCircleFill className="btn-menu" />} link="/finance" />
        <ButtonMenu label="Clientes" icon={<FaUserFriends className="btn-menu" />} link="/clients" />
        <ButtonMenu label="Pedidos" icon={<FaFileInvoiceDollar className="btn-menu" />} link="/orders" />
        <ButtonMenu label="Produtos" icon={<FaBox className="btn-menu" size={25} />} link="/products" />
        <ButtonMenu label="Resumo" icon={<FaFilePdf className="btn-menu" />} link="/resume" />
        <ButtonMenu label="Sorteio" icon={<GiDiamondTrophy className="btn-menu" />} link="/sorteio" /> */}
      </MenuContainer>
    </Container>
  );
};
