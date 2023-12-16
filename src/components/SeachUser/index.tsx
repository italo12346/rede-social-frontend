import React, { useState, useEffect, FC } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';

import {Container, Input,HeaderText,EmptyListText,UserItem} from './styles'
import { getUserByName } from '../../service/api'; // Importe a função getUserByName

interface User {
  _id: string;
  nome: string;
  usuario: string;
}

const SearchUsers: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    // Função para buscar usuários pelo nome
    const searchUsers = async () => {
      try {
        if (searchTerm.trim() !== '') {
          const result: User | null = await getUserByName(searchTerm);

          if (result !== null) {
            setSearchResults([result]);
          } else {
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    searchUsers();
  }, [searchTerm]);

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <UserItem>
      <Text>{item.nome}</Text>
      <Text>{item.usuario}</Text>
      {/* Adicione mais informações conforme necessário */}
    </UserItem>
  );

  return (
    <Container>
      <Input
        placeholder="Digite o nome de usuário"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<HeaderText>Resultados:</HeaderText>}
        ListEmptyComponent={
          <EmptyListText>Nenhum usuário encontrado</EmptyListText>
        }
      />
    </Container>
  );
};
export default SearchUsers;
