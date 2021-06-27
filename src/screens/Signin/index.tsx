import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import { styles } from './styles';

import IllustrationImg from '../../assets/illustration.png';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const navigation = useNavigation();

  const { signIn, loadingAuth } = useAuth();
  const handleSignIn = async () => {
    // navigation.navigate('Home');

    try {
      await signIn();
    } catch (e) {
      Alert.alert(e);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            {'Conecte-se \n e organize suas \n jogatinas \n '}
          </Text>
          <Text style={styles.subtitle}>
            {'Crie grupos para jogar seus games \n favoritos com seus amigos'}
          </Text>
          {loadingAuth ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
