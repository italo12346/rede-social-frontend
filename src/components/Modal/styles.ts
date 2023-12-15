import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justifyContent: flex-end;
  backgroundColor: rgba(0, 0, 0, 0.6);
`;

export const Header = styled.View`
borderStyle:solid;
border-bottom-color: #cecece;
border-bottom-width: 2px;
width:100%;
color:#fff;
flexDirection:row;
justifyContent: space-between;

`;
export const EditWindow = styled.View`
  height: 30%;
  padding:20px;
  backgroundColor: #ffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-top: 5px;
  color: black;
`;
