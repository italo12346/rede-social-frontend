import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  background-color: #0000;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.View`
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
  border-bottom-color: #cecece;
  border-bottom-width: 2px;
`;

export const Title = styled.Text`
  color: #000;
  font-size: 60px;
  margin-bottom: 13px;
  font-family:Itim_400Regular;
`;

export const Input = styled.TextInput`
  width: 310px;
  height: 50px;
  background-color: #d9d9d9;
  font-size: 14px;
  color: #fdfcfe;
  padding: 12px;
  border-radius: 14px;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 315px;
  height: 50px;
  color: #fff;
  background-color: #2e4374;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;

export const SignUpContainer = styled.View`
  margin-top: 5%;
  margin-bottom: -40%;
  height: 20%;
  width: 100%;
  align-items: center;
`;

export const SignUpText = styled.Text`
  color: blue;
`;

export const ErroText = styled.Text`
  color: red;
`;

