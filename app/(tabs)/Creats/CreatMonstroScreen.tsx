import { ThemedText } from '@/components/themed-text';
import { IMonstros } from '@/interfaces/IMonstros';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@PDM-EXPO:monstros';

export default function CreateMonstroScreen() {
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
    const loadCurrentMonstro = async () => {
      if (!editingId) {
        setTitle('');
        setSubTitle('');
        return;
      }

      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const savedMonstros: IMonstros[] = data != null ? JSON.parse(data) : [];
      const current = savedMonstros.find(item => item.id === editingId);

      if (current) {
        setTitle(current.title);
        setSubTitle(current.subTitle);
      }
    };

    void loadCurrentMonstro();
  }, [editingId]);

  const saveMonstro = async () => {
    const trimmedTitle = title.trim();
    const trimmedSubTitle = subTitle.trim();

    if (!trimmedTitle || !trimmedSubTitle) {
      return;
    }

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const savedMonstros: IMonstros[] = data != null ? JSON.parse(data) : [];

    const updatedMonstros = editingId
      ? savedMonstros.map(item =>
          item.id === editingId ? { ...item, title: trimmedTitle, subTitle: trimmedSubTitle } : item,
        )
      : [...savedMonstros, { id: Date.now(), title: trimmedTitle, subTitle: trimmedSubTitle }];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMonstros));
    router.replace('/MonstrosListScreen');
  };

  const deleteMonstro = async () => {
    if (!editingId) {
      return;
    }

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const savedMonstros: IMonstros[] = data != null ? JSON.parse(data) : [];
    const updatedMonstros = savedMonstros.filter(item => item.id !== editingId);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMonstros));
    router.replace('/MonstrosListScreen');
  };

  const cancel = () => {
    router.replace('/MonstrosListScreen');
  };

  const isEditing = Boolean(editingId);

  return (
    <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>{isEditing ? 'Editar Monstro' : 'Criar Monstro'}</ThemedText>

        <TextInput
          style={styles.boxInput}
          placeholder='Nome do monstro'
          value={title}
          onChangeText={text => setTitle(text)}
          autoFocus
        />

        <TextInput
          style={styles.boxInput}
          value={subTitle}
          onChangeText={text => setSubTitle(text)}
          placeholder='Arquétipo do Monstro'
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAdd} onPress={saveMonstro}>
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
            <TouchableOpacity style={styles.buttonDelete} onPress={deleteMonstro}>
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