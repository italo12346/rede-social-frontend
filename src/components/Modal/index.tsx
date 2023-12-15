import React, { FC } from "react";
import { View, Text, Modal, Button, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import {
  Container,
  EditWindow,
  Header,
  Buttons,
  StyledButton,
  ButtonText
} from "./styles";
interface EditModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const deletePub = ()=>{

}

const editPub = ()=>{

}

const EditModal: FC<EditModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <Container>
        <EditWindow>
          <Header>
            <Text>Opções</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={25} color="black" />
            </TouchableOpacity>
          </Header>
          <Buttons>
            <StyledButton onPress={deletePub}>
              <Ionicons name="pencil-outline" size={25} color="black" />
              <ButtonText>Editar</ButtonText>
            </StyledButton>
            <StyledButton onPress={editPub}>
              <Ionicons name="trash" size={25} color="black" />
              <ButtonText>Deletar</ButtonText>
            </StyledButton>
          </Buttons>
        </EditWindow>
      </Container>
    </Modal>
  );
};

export default EditModal;
