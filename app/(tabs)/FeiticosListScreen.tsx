import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Feiticos from '@/components/Feitiços/feiticos';
import MonstrosScrollView from '@/components/MonstrosScrollView';
import { ThemedView } from '@/components/themed-view';
import { IFeiticos } from '@/interfaces/IFeiticos';

const STORAGE_KEY = '@PDM-EXPO:feiticos';

export default function FeiticosListScreen() {
  const [feiticos, setFeiticos] = useState<IFeiticos[]>([]);
  const [gpsText, setGpsText] = useState('Obtendo localizacao...');

  const loadFeiticos = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const savedFeiticos = data != null ? JSON.parse(data) : [];
      setFeiticos(savedFeiticos);
    } catch (error) {
      console.error('Failed to load feiticos', error);
    }
  }, []);

  useEffect(() => {
    void loadFeiticos();
  }, [loadFeiticos]);

  useFocusEffect(
    useCallback(() => {
      void loadFeiticos();
    }, [loadFeiticos]),
  );

  useEffect(() => {
    const loadLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setGpsText('GPS sem permissao');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude.toFixed(4);
      const lon = location.coords.longitude.toFixed(4);
      setGpsText(`GPS: ${lat}, ${lon}`);
    };

    void loadLocation();
  }, []);

  const openCreateScreen = () => {
    router.push('/Creats/CreateFeiticoScreen');
  };

  const openEditScreen = (feitico: IFeiticos) => {
    router.push({
      pathname: '/Creats/CreateFeiticoScreen',
      params: { id: String(feitico.id) },
    });
  };

  return (
    <MonstrosScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openCreateScreen}>
          <Text style={styles.headerButton}>+ Adicionar</Text>
        </TouchableOpacity>
        <Text style={styles.gpsText}>{gpsText}</Text>
      </ThemedView>

      <ThemedView style={styles.container}>
        {feiticos.map(feitico => (
          <TouchableOpacity key={feitico.id} onPress={() => openEditScreen(feitico)}>
            <Feiticos title={feitico.title} subTitle={feitico.subTitle} />
          </TouchableOpacity>
        ))}

        {feiticos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum feitiço cadastrado.</Text>
            <Text style={styles.emptyText}>Toque em + Adicionar para criar.</Text>
          </View>
        ) : null}
      </ThemedView>
    </MonstrosScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  gpsText: {
    marginTop: 8,
    fontSize: 12,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontWeight: '600',
  },
});
