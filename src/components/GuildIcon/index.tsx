import React from 'react';
import { Image, View } from 'react-native';
import { RectButtonProps, RectButton } from 'react-native-gesture-handler';
import { CDN_IMAGE } from '../../configs/discord.auth';

import DiscordImg from '../../assets/discord.svg';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type GuildProps = {
  guildId: string;
  iconId: string | null;
};

export function GuildIcon({ guildId, iconId }: GuildProps) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

  return (
    <View style={styles.container}>
      {!iconId ? (
        <DiscordImg width={40} height={40} />
      ) : (
        <Image
          style={styles.icon}
          source={{
            uri,
          }}
          resizeMode="cover"
        />
      )}
    </View>
  );
}
