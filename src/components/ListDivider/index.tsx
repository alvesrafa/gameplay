import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../Avatar';
import { theme } from '../../global/styles/theme';

type Props = {
  isCentered?: boolean;
};

export function ListDivider({ isCentered = false }: Props) {
  return (
    <View
      style={[
        {
          width: '78%',
          height: 1,
          backgroundColor: theme.colors.secondary40,
          alignSelf: 'flex-end',
        },
        isCentered
          ? {
              marginVertical: 12,
            }
          : {
              marginTop: 2,
              marginBottom: 31,
            },
      ]}
    />
  );
}
