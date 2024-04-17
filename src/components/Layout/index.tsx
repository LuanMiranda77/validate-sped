import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { MainBreadcrumb } from "../MainBreadcrumb";
import { MainContent } from "../MainContent";
import { MainFooter } from "../MainFooter";
import { MainHeader } from "../MainHeader";
import { Grid } from "./styles";

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
    <Grid className={sizeAside} style={{ gridTemplateColumns: sizeAside }}>
      <MainHeader alterTheme={props.alterTheme} onClickMenu={visibleAside} />
      {/* <Aside /> */}
      <MainBreadcrumb />
      <MainContent>{props.children}</MainContent>
      <MainFooter />
    </Grid>
  );
};
