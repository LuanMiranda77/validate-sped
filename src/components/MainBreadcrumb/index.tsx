import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";

export const MainBreadcrumb: React.FC = () => {
  const { title, colors } = useContext(ThemeContext);

  return (
    <Container className="">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">MUI</Link>
        <Link to="/material-ui/getting-started/installation/">Core</Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </Container>
  );
};
