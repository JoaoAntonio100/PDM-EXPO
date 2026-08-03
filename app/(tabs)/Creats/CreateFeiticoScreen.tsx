import { ThemedText } from '@/components/themed-text';
import { IFeiticos } from '@/interfaces/IFeiticos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@PDM-EXPO:feiticos';

export default function CreateFeiticoScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');

  const editingId = useMemo(() => {
    if (!params.id) {
      return undefined;
    }

    const parsed = Number(params.id);
    return Number.isFinite(parsed) ? parsed : undefined;
  }, [params.id]);

  useEffect(() => {
    const loadCurrentFeitico = async () => {
      if (!editingId) {
        setTitle('');
        setSubTitle('');
        return;
      }

      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const savedFeiticos: IFeiticos[] = data != null ? JSON.parse(data) : [];
      const current = savedFeiticos.find(item => item.id === editingId);

      if (current) {
        setTitle(current.title);
        setSubTitle(current.subTitle);
      }
    };

    void loadCurrentFeitico();
  }, [editingId]);

  const saveFeitico = async () => {
    const trimmedTitle = title.trim();
    const trimmedSubTitle = subTitle.trim();

    if (!trimmedTitle || !trimmedSubTitle) {
      return;
    }

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const savedFeiticos: IFeiticos[] = data != null ? JSON.parse(data) : [];

    const updatedFeiticos = editingId
      ? savedFeiticos.map(item =>
          item.id === editingId ? { ...item, title: trimmedTitle, subTitle: trimmedSubTitle } : item,
        )
      : [...savedFeiticos, { id: Date.now(), title: trimmedTitle, subTitle: trimmedSubTitle }];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeiticos));
    router.replace('/FeiticosListScreen');
  };

  const deleteFeitico = async () => {
    if (!editingId) {
      return;
    }

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const savedFeiticos: IFeiticos[] = data != null ? JSON.parse(data) : [];
    const updatedFeiticos = savedFeiticos.filter(item => item.id !== editingId);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeiticos));
    router.replace('/FeiticosListScreen');
  };

  const cancel = () => {
    router.replace('/FeiticosListScreen');
  };

  const isEditing = Boolean(editingId);

  return (
    <View style={styles.container}>

        <ThemedText type="title" style={styles.title}>{isEditing ? 'Editar Feitiço' : 'Criar Feitiço'}</ThemedText>

        <TextInput
          style={styles.boxInput}
          placeholder='Nome do Feitiço'
          value={title}
          onChangeText={text => setTitle(text)}
          autoFocus
        />

        <TextInput
          style={styles.boxInput}
          value={subTitle}
          onChangeText={text => setSubTitle(text)}
          placeholder='Arquétipo do Feitiço'
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAdd} onPress={saveFeitico}>
            <Text style={styles.buttonText}>
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCancel} onPress={cancel}>
            <Text style={styles.buttonText}>
              Cancelar
            </Text>
          </TouchableOpacity>

          {isEditing ? (
            <TouchableOpacity style={styles.buttonDelete} onPress={deleteFeitico}>
              <Text style={styles.buttonText}>
                Deletar
              </Text>
            </TouchableOpacity>
          ) : null}

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  boxContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    marginBottom: 20,
    color: '#333',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonAdd: {
    backgroundColor: 'green',
    borderRadius: 10,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: 'orange',
    borderRadius: 10,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonDelete: {
    backgroundColor: 'red',
    borderRadius: 10,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: 70,
  },
  boxInput: {
    alignSelf: 'center',
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#DDD',
    margin: 5,
    paddingHorizontal: 10,
  },
});