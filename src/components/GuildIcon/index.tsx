import React from 'react';
import { Image, Text } from 'react-native';
import { RectButtonProps, RectButton } from 'react-native-gesture-handler';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type GuildProps = {};

export function GuildIcon({}: GuildProps) {
  const uri =
    'https://logosmarcas.net/wp-content/uploads/2020/12/Discord-Logo.png';

  return (
    <Image
      style={styles.container}
      source={{
        uri,
      }}
      resizeMode="cover"
    />
  );
}
