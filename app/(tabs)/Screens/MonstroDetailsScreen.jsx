import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MonstroDetailsScreen() {
  const { monstroId } = useLocalSearchParams();
  const [selectedMonstro, setSelectedMonstro] = useState(null);
  const [monstros, setMonstros] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@PDM-EXPO:monstros');
        const savedMonstros = data != null ? JSON.parse(data) : [];
        setMonstros(savedMonstros);

        savedMonstros.forEach((element) => {
          if (element.id.toString() === monstroId) {
            setSelectedMonstro(element);
          }
        });
      } catch (e) {
        console.error('Failed to load monstro detail', e);
      }
    }

    getData();
  }, [monstroId]);

  const onDelete = async () => {
    if (!selectedMonstro) return;

    const newMonstros = [];

    for (let index = 0; index < monstros.length; index++) {
      const monstro = monstros[index];

      if (String(monstro.id) !== String(selectedMonstro.id)) {
        newMonstros.push(monstro);
      }
    }

    setMonstros(newMonstros);
    await AsyncStorage.setItem('@PDM-EXPO:monstros', JSON.stringify(newMonstros));
    router.replace('/MonstrosListScreen');
  };

  return (
    <View style={styles.screen}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.headerButton}>X</Text>
        </TouchableOpacity>
      </ThemedView>

      <View style={styles.box}>
        <Text style={styles.title}>
          {selectedMonstro ? selectedMonstro.title : 'Monstro não encontrado'}
        </Text>
        <Text style={styles.subTitle}>
          {selectedMonstro ? selectedMonstro.subTitle : 'Sem detalhes'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-start',
    padding: 24,
    marginHorizontal: 18,
    marginVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginTop: 8,
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
});
