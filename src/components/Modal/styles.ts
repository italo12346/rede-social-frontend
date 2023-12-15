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
  height: 25%;
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
export const TextButton = styled.Text`
color:#fff;
`;
export const StyledButton = styled.TouchableOpacity`
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-top: 5px;
  color: black;
`;

export const Salvar = styled.TouchableOpacity`
background-color: green;
width: 100px;
height: 30px;
margin:5px;
justify-content: center;
align-items: center;
border-radius: 14px;
`;

export const Deletar = styled.TouchableOpacity`
background-color: red;
width: 100px;
height: 30px;
margin:5px;
justify-content: center;
align-items: center;
border-radius: 14px;
`;


export const TexEdit = styled.TextInput`
width: 310px;
height: 50px;
background-color: #d9d9d9;
font-size: 14px;
color: #fdfcfe;
padding: 12px;
border-radius: 14px;
`;

export const DescriptionEdit = styled.View`
flex:1;
align-items: center;
justify-content:center;
`;


export const ConfirmButton = styled.TouchableOpacity`
  background-color: green;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: red;
  padding: 10px 20px;
  border-radius: 5px;
`;