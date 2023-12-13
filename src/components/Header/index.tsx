import React from "react";
import { HeaderContainer, HeaderText } from "./styles";

interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {

  return (
    <HeaderContainer>
      <HeaderText>{props.title}</HeaderText>
    </HeaderContainer>
  );
}

export default Header;
