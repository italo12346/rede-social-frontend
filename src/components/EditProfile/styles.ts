import styled from "styled-components/native";
import styledMod from "@emotion/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Body = styled.View`
  align-items: center;
  padding: 20px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

export const Input = styled.TextInput`
  background: ${(props) => (props.theme.mode === "dark" ? "#222" : "#e1e1e1")};
  color: ${(props) => (props.theme.mode === "dark" ? "#FFF" : "#000")};
  background: #e1e1e1;
  width: 350px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  padding: 5px;
  margin-top: 15px;
`;
