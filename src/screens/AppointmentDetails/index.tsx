import React from 'react';
import { View, ImageBackground, Text, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import bannerImg from '../../assets/banner.png';

export function AppointmentDetails() {
  const members = [
    {
      id: '1',
      username: 'raufa',
      avatar_url: 'https://github.com/alvesrafa.png',
      status: 'online',
    },
    {
      id: '2',
      username: 'raufa2',
      avatar_url: 'https://github.com/alvesrafa.png',
      status: 'offline',
    },
    {
      id: '3',
      username: 'raufa3',
      avatar_url: 'https://github.com/alvesrafa.png',
      status: 'online',
    },
    {
      id: '4',
      username: 'raufa3',
      avatar_url: 'https://github.com/alvesrafa.png',
      status: 'offline',
    },
    {
      id: '5',
      username: 'raufa3',
      avatar_url: 'https://github.com/alvesrafa.png',
      status: 'offline',
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>è hoje familiaaaa simboraaa!</Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 4" />

      <FlatList
        data={members}
        style={styles.members}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        renderItem={({ item }) => <Member data={item} />}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
