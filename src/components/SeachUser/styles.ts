import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
flex: 1;
padding: 16px;
`;

export const Busca = styled.View`
height: 60px;
flexDirection:row;
`;

export const Input = styled.TextInput`
width: 80%;
height: 50px;
background-color: #d9d9d9;
font-size: 14px;
color: #fdfcfe;
padding: 12px;
border-radius: 14px;
margin-top: 8px;
`;

export const Button = styled.TouchableOpacity`
        height: 50px;
        padding: 16px;
        borderBottomWidth: 1px;
        borderBottomColor: #ccc;
        background-color: #2e4374;
        border-radius: 14px;
        margin:6px;
`;

export const HeaderText = styled.Text`
        fontSize: 18px;
        fontWeight: bold;
        marginTop: 8px;
        marginBottom: 8px;
`;

export const ButtonText = styled.Text`
color: #ffffff;
fontWeight: bold;
`;

export const Avatar = styled.Image`
width: 50px;
height: 50px;
borderRadius: 80px;
marginRight: 10px;
`;


export const ItemContainer = styled.View`
flexDirection: row;
padding: 10px;
borderBottomWidth: 1px;
borderColor: #ecf0f1;
align-items: center;

`;

export const UserName = styled.Text`
fontSize: 16px;
`;
