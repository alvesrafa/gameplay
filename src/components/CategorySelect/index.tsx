import React from 'react';
import { ScrollView } from 'react-native';

import { styles } from './styles';
import { categories } from '../../utils/categories';

import { Category } from '../Category';

type CategorySelectProps = {
  categoriySelected: string;
  handleSelectCategory: (id: string) => void;
  hasCheckBox?: boolean;
};

export function CategorySelect({
  categoriySelected,
  handleSelectCategory,
  hasCheckBox = false,
}: CategorySelectProps) {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 40,
      }}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categoriySelected}
          onPress={() => handleSelectCategory(category.id)}
          hasCheckBox={hasCheckBox}
        />
      ))}
    </ScrollView>
  );
}
