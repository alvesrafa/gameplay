import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Loading } from '../../components/Loading';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/storage';

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  async function fetchAppointmentsByStorage() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointmentsStorage: AppointmentProps[] = storage
      ? JSON.parse(storage)
      : [];

    if (category) {
      setAppointments(
        appointmentsStorage.filter((item) => item.category === category)
      );
    } else {
      setAppointments(appointmentsStorage);
    }

    setLoading(false);
  }
  useFocusEffect(
    useCallback(() => {
      fetchAppointmentsByStorage();
    }, [category])
  );

  const handleSelectCategory = (stringId: string) => {
    stringId === category ? setCategory('') : setCategory(stringId);
  };
  const handleAppointmentCreate = () => {
    navigation.navigate('AppointmentCreate');
  };
  const handleSelectAppointment = (appointmentSelected: AppointmentProps) => {
    navigation.navigate('AppointmentDetails', {
      appointment: appointmentSelected,
    });
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categoriySelected={category}
          handleSelectCategory={handleSelectCategory}
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />
            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleSelectAppointment(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{
                paddingBottom: 69,
              }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </Background>
  );
}
