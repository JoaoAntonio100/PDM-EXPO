import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FeiticoDetailsScreen() {
  const { feiticoId } = useLocalSearchParams();
  const [selectedFeitico, setSelectedFeitico] = useState(null);
  const [feiticos, setFeiticos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@PDM-EXPO:feiticos');
        const savedFeiticos = data != null ? JSON.parse(data) : [];
        setFeiticos(savedFeiticos);

        savedFeiticos.forEach((element) => {
          if (element.id.toString() === feiticoId) {
            setSelectedFeitico(element);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }

    getData();
  }, [feiticoId]);

  const onDelete = async () => {
    if (!selectedFeitico) return;

    const newFeiticos = [];

    for (let index = 0; index < feiticos.length; index++) {
      const feitico = feiticos[index];

      if (String(feitico.id) !== String(selectedFeitico.id)) {
        newFeiticos.push(feitico);
      }
    }

    setFeiticos(newFeiticos);
    await AsyncStorage.setItem('@PDM-EXPO:feiticos', JSON.stringify(newFeiticos));
    router.replace('/FeiticosListScreen');
  };

  return (
    <View style={styles.screen}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.headerButton}>X</Text>
        </TouchableOpacity>
      </ThemedView>

      <View style={styles.box}>
        <Text style={styles.title}>{selectedFeitico ? selectedFeitico.title : 'Feitiço não encontrado'}</Text>
        <Text style={styles.subTitle}>{selectedFeitico ? selectedFeitico.subTitle : 'Sem detalhes'}</Text>
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