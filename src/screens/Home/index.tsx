import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Appointment } from '../../components/Appointment';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20h40',
      description: 'É hoje que vamos botar eles pra mamar',
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20h40',
      description: 'É hoje que vamos botar eles pra mamar',
    },
  ];

  const handleSelectCategory = (stringId: string) => {
    stringId === category ? setCategory('') : setCategory(stringId);
  };

  return (
    <Background style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>

      <CategorySelect
        categoriySelected={category}
        handleSelectCategory={handleSelectCategory}
      />

      <View style={styles.content}>
        <ListHeader title="Partidas agendadas" subtitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}
