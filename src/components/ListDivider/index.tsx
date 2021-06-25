import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../Avatar';
import { theme } from '../../global/styles/theme';
export function ListDivider() {
  return (
    <View
      style={{
        width: '80%',
        height: 1,
        backgroundColor: theme.colors.secondary40,
        marginVertical: 21,
        alignSelf: 'flex-end',
      }}
    />
  );
}
