import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

export function TextArea({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      {...rest}
      multiline
      maxLength={100}
      numberOfLines={5}
    />
  );
}
