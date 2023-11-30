import styled from "styled-components/native";

export const ProfileContainer = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border-width: 3px;
  border-color: #fff;
  margin-right: 20px;
`;
export const Name = styled.Text`
  color: #333;
  font-weight: bold;
  margin-left: 20px;
  font-size: 14px;
`;

export const Info = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 17px;
  margin-left: 20px;
`;
