import React, { useContext, useState } from "react";
import { Grid } from "./styles";
import { MainHeader } from "../MainHeader";
import { Aside } from "../Aside";
import { Content } from "../Content";
import { ThemeContext } from "styled-components";

interface Props {
  //adicionar os props
  alterTheme(): void;
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
  const { colors, title } = useContext(ThemeContext);
  const [sizeAside, setSizeAside] = useState("70px");

  const visibleAside = () => {
    let aside = sizeAside === "50px" ? "0px" : "50px";
    setSizeAside(aside);
  };

  return (
    <Grid className={sizeAside} style={{gridTemplateColumns:sizeAside}}>
      <MainHeader
        alterTheme={props.alterTheme}
        onClickMenu={visibleAside}
      />
      <Aside />
      <Content>{props.children}</Content>
    </Grid>
  );
};
