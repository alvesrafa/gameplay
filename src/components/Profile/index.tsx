import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../Avatar';
import { styles } from './styles';

export function Profile() {
  const { user, logout } = useAuth();

  function handleSignOut() {
    Alert.alert('Saindo :/', 'Deseja sair do GamePlay mesmo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user?.avatar || ''} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user?.firstname}</Text>
        </View>
        <Text style={styles.message}>Hoje é dia de Vitória</Text>
      </View>
    </View>
  );
}
