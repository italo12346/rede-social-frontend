
import React, { FC, useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  EditWindow,
  Header,
  Buttons,
  StyledButton,
  ButtonText,
  TexEdit,
  DescriptionEdit,
  Salvar,
  Deletar,
  TextButton
} from "./styles";

interface EditModalProps {
  isVisible: boolean;
  onClose: () => void;
  description: string | null; // Modificado para garantir que seja sempre uma string
}

const EditModal: FC<EditModalProps> = ({ isVisible, onClose, description }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const deletePub = () => {
    // Implementação da lógica de deletar
  };

  const editPub = () => {
    setEditedText(description || ""); // Inicializa com a descrição atual ou uma string vazia se for nula
    setIsEditing(true);
  };

  const saveChanges = () => {
    // Implementação da lógica de salvar as alterações
    setIsEditing(false);
  };

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
          {isEditing ? (
            <DescriptionEdit>
              <TexEdit
                placeholder="Edite sua descrição aqui"
                value={editedText}
                onChangeText={(text) => setEditedText(text)}
              />
              <Salvar onPress={saveChanges}>
                <TextButton>Salvar</TextButton>
              </Salvar>

              <Deletar onPress={saveChanges}>
                <TextButton>Cancelar</TextButton>
              </Deletar>
            </DescriptionEdit>
          ) : (
            <Buttons>
              <StyledButton onPress={editPub}>
                <Ionicons name="pencil-outline" size={25} color="black" />
                <ButtonText>Editar</ButtonText>
              </StyledButton>
              <StyledButton onPress={deletePub}>
                <Ionicons name="trash" size={25} color="black" />
                <ButtonText>Deletar</ButtonText>
              </StyledButton>
            </Buttons>
          )}
        </EditWindow>
      </Container>
    </Modal>
  );
};

export default EditModal;