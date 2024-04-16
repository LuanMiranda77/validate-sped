import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import React from "react";

interface Props {
  isLoading: boolean;
  message:string;
}

const Loading: React.FC<Props> = ({ isLoading, message='Carregando...' }) => {
  return (
    <Dialog className="m-0" open={isLoading}>
      <DialogContent
        dividers
        // style={{
        //   backgroundColor: title === "dark" ? colors.secondary : colors.white,
        // }}
        sx={{
          // backgroundColor: "",
          height: "100%",
          width: "100%",
          margin: "0px",
          // opacity:'0.1',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'

        }}
      >
        <CircularProgress />
        <h2 className="ml-2">{message}</h2>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
