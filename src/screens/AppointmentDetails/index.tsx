import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  FlatList,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Loading } from '../../components/Loading';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import bannerImg from '../../assets/banner.png';

import { api } from '../../services/api';

type RouteParams = {
  appointment: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const [loading, setLoading] = useState(true);

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

  const route = useRoute();

  const { appointment } = route.params as RouteParams;

  function handleOpenGuild() {
    if (widget.instant_invite) {
      Linking.openURL(widget.instant_invite);
    } else {
      Alert.alert(
        'Infelizmente o adminstrador do canal não autoriza está ação'
      );
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${appointment.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${appointment.guild.id}/widget.json`
      );
      setWidget(response.data);
      console.log('widget.instant_invite', response.data);
    } catch (e) {
      Alert.alert(
        'Verifique as configurações do servidor. Será que o Widget está habilitado?'
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          widget.instant_invite && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointment.guild.name}</Text>
          <Text style={styles.subtitle}>{appointment.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            style={styles.members}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            renderItem={({ item }) => <Member data={item} />}
          />
        </>
      )}
      {widget.instant_invite && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
}
