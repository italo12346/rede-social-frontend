import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
flex: 1;
padding: 16px;
`;

export const Input = styled.TextInput`
width: 100%;
height: 50px;
background-color: #d9d9d9;
font-size: 14px;
color: #fdfcfe;
padding: 12px;
border-radius: 14px;
margin-top: 8px;
`;

export const UserItem = styled.TouchableOpacity`
        padding: 16px;
        borderBottomWidth: 1px;
        borderBottomColor: #ccc;
        background-color: #2e4374;
`;

export const HeaderText = styled.Text`
        fontSize: 18px;
        fontWeight: bold;
        marginTop: 8px;
        marginBottom: 8px;
`;

export const EmptyListText = styled.Text`
textAlign: center;
marginTop: 16px;
color: gray;
`;
