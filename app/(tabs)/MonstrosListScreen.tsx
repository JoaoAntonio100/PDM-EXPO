import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Monstros from '@/components/Monstros/monstros';
import MonstrosScrollView from '@/components/MonstrosScrollView';
import { ThemedView } from '@/components/themed-view';
import { IMonstros } from '@/interfaces/IMonstros';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export default function MonstrosListScreen() {
  const [monstros, setMonstros] = useState<IMonstros[]>([]);
  const [gpsText, setGpsText] = useState<string>('Obtendo localizacao...');

  const loadMonstros = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('@PDM-EXPO:monstros');
      const savedMonstros = data != null ? JSON.parse(data) : [];
      setMonstros(savedMonstros);
    } catch (e) {
      console.error('Failed to load monstros', e);
    }
  }, []);

  useEffect(() => {
    loadMonstros();
  }, [loadMonstros]);

  useFocusEffect(
    useCallback(() => {
      void loadMonstros();
    }, [loadMonstros]),
  );

  useEffect(() => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setGpsText('GPS sem permissao');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude.toFixed(4);
      const lon = location.coords.longitude.toFixed(4);
      setGpsText(`GPS: ${lat}, ${lon}`);
    })();
  }, []);

  const openCreateScreen = () => {
    router.push('/Creats/CreatMonstroScreen');
  };

  const openEditScreen = (monstro: IMonstros) => {
    router.push({
      pathname: '/Creats/CreatMonstroScreen',
      params: { id: String(monstro.id) },
    });
  };


  return (
    <MonstrosScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openCreateScreen}>
          <Text style={styles.headerButton}>+ Adicionar</Text>
        </TouchableOpacity>
        <Text style={styles.gpsText}>{gpsText}</Text>
      </ThemedView>

      <ThemedView style={styles.container}>
        {monstros.map(monstro => (
          <TouchableOpacity onPress={() => openEditScreen(monstro)} key={monstro.id}>
            <Monstros
              title={monstro.title}
              subTitle={monstro.subTitle}
            />
          </TouchableOpacity>
        ))}

        {monstros.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum monstro cadastrado.</Text>
            <Text style={styles.emptyText}>Toque em + Adicionar para criar.</Text>
          </View>
        ) : null}
      </ThemedView>
    </MonstrosScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: 0,
    left: 0,
  },
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