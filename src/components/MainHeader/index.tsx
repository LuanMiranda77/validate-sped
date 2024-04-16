import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import { logout } from "../../service/auth";
import { Container } from "./styles";
import { Logo } from "../Logo";

interface Props {
  //adicionar os props
  alterTheme(): void;
  onClickMenu(): void;
}

export const MainHeader: React.FC<Props> = ({ alterTheme, onClickMenu }) => {
  const { title, colors } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className="" style={{ boxShadow: "0px 15px 10px gray" }}>
      <div className="">
        {/* <button
          style={{
            backgroundColor: "transparent",
            border: 0,
            fontSize: "25px",
            color: colors.white,
          }}
          onClick={onClickMenu}
        >
          <AiOutlineMenu />
        </button> */}
        <Logo size="MINI" />
      </div>

      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FaUserCircle size={22} color={colors.white}/>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={alterTheme}>
            {title == "dark" ? "Tema light" : "Tema dark"}
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            Sair
          </MenuItem>
        </Menu>
      </div>
    </Container>
  );
};
