import React from "react";
import { Link } from "react-router-dom";

// import { Container } from './styles';
interface MenuProps {
  icon: React.ReactNode;
  link: string;
  label: string;
}

const ButtonMenu: React.FC<MenuProps> = ({ icon, label, link }) => {
  var url = window.location.href;
  console.log(url)
  return (
    <Link className="text-[#757575] btn-menu font-bold  active:bg-blue-600 active:text-white h-[60px]" to={link}>
      <i className="mr-2">{icon}</i>
      <span>{label}</span>
    </Link>
  );
};

export default ButtonMenu;
