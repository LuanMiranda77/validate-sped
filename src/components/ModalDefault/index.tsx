import { DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, useContext } from "react";
import { ThemeContext } from "styled-components";
import { ButtonBase } from "../Buttons/ButtonBase";
import { Container } from "./styles";

interface ModalDefaultProps {
  //adicionar os props
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  width?: "98%" | string;
  left?: "0%" | string;
  right?: "0%" | string;
  height?: "98%" | string;
  margin?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  textBtnAction?: string;
  onRequestClose: () => void;
  onClickAction?: () => void;
  isFullScreen?: boolean;
}

export const ModalDefault: React.FC<ModalDefaultProps> = (props) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <Container className="w-full">
      <Dialog
        className="m-0"
        open={props.isOpen}
        onClose={props.onRequestClose}
        // TransitionComponent={transition}
        maxWidth={props.maxWidth ? props.maxWidth : false}
        fullScreen={props.isFullScreen ? props.isFullScreen : false}
        fullWidth={props.maxWidth ? false:true}
        sx={
          {overflowX:'hidden'}
        }
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 0.5,
            background: title === "dark" ? colors.secondary : colors.primary,
            color: "#fff",
            paddingLeft: "1rem",
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
          }}
        >
          {props.title}
          {props.onRequestClose ? (
            <IconButton
              aria-label="close"
              onClick={props.onRequestClose}
              sx={{
                position: "absolute",
                right: 15,
                top: -6,
                color: colors.white,
              }}
            >
              x
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent
          dividers
          // style={{
          //   backgroundColor: title === "dark" ? colors.secondary : colors.white,
          // }}
          sx={{
            backgroundColor: title === "dark" ? colors.secondary : colors.white,
            height: props.height ? props.height : "100%",
            width: props.width ? props.width : "100%",
            margin: props.margin ? props.margin : "0px",
            left: props.left,
            overflowX:'hidden'
            // maxHeight:'900px',
            // maxWidth:'1080px',
          }}
        >
          {props.children}
        </DialogContent>
        <DialogActions sx={{ border: "1px solid silver",}}>
          <ButtonBase
            label="Cancelar"
            model="btn_line"
            className="primary-color mr-5  w-32"
            size="large"
            onClick={props.onRequestClose}
          />
          <ButtonBase
            label={props.textBtnAction ? props.textBtnAction : "Salvar"}
            model="btn_base"
            className="primary-color px-3 w-32"
            size="large"
            onClick={props.onClickAction}
            type="submit"
          />
        </DialogActions>
      </Dialog>
    </Container>
  );
};
