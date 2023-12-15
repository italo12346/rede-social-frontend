import styled from "styled-components/native";

export const ProfileContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
export const Avatar = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border-width: 3px;
  border-color: #fff;
  margin-left: 39%;
`;
export const Name = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 17px;
`;

export const NameUser = styled.View`
  width: 150px;
  align-items: center;
  margin-left: 31%;
  margin-top: 10px;
`;

export const Info = styled.View`
  width: 150px;
  align-items: center;
  margin-left: 31%;
  margin-top: 10px;
`;

export const InfoName = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 14px;
`;

export const EditBottom = styled.Text`
  background: #e1e1e1;
  width: 150px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 20px;
  font-size: 14px;
  text-align: center;
  padding: 5px;
  margin-top: 8px;
`;

