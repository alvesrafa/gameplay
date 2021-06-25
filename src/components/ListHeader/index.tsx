import React from 'react';
import { View, Text } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type ListHeaderProps = {
  title: string;
  subtitle: string;
};

export function ListHeader({ title, subtitle }: ListHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
