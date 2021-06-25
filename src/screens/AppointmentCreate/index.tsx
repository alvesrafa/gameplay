import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { GuildIcon } from '../../components/GuildIcon';
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [isGuildsModalOpen, setIsGuildsModalOpen] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const handleOpenGuilds = () => {
    setIsGuildsModalOpen(true);
  };
  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setIsGuildsModalOpen(false);
  }

  const handleSelectCategory = (stringId: string) => {
    stringId === category ? setCategory('') : setCategory(stringId);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Header title="Agendar partida" />

        <Text
          style={[
            styles.label,
            {
              marginLeft: 24,
              marginTop: 36,
              marginBottom: 18,
            },
          ]}
        >
          Categoria
        </Text>

        <CategorySelect
          hasCheckBox
          categoriySelected={category}
          handleSelectCategory={handleSelectCategory}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuilds}>
            <View style={styles.select}>
              {guild?.icon ? <GuildIcon /> : <View style={styles.fakeImage} />}
              <View style={styles.selecBody}>
                <Text style={styles.label}>
                  {guild?.name ? guild.name : 'Selecione um servidor'}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={18}
                color={theme.colors.heading}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
            <View>
              <Text style={styles.label}>Horário</Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.field,
              {
                marginBottom: 12,
              },
            ]}
          >
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.charLimit}>Max 100 caracteres</Text>
          </View>
          <TextArea />

          <View style={styles.footer}>
            <Button title="Agendar" />
          </View>
        </View>
      </ScrollView>
      <ModalView visible={isGuildsModalOpen}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
