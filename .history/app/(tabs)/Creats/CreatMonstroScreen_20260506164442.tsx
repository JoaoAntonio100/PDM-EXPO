import { ThemedText } from '@/components/themed-text';
import { IMonstros } from '@/interfaces/IMonstros';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type CreateMonstroScreenProps = {
  onAdd: (title: string, subTitle: string, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  monstro?: IMonstros;
};

export default function CreateMonstroScreen({ onAdd, onCancel, onDelete, monstro }: CreateMonstroScreenProps) {
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (monstro) {
      setTitle(monstro.title);
      setSubTitle(monstro.subTitle);
      setId(monstro.id);
    } else {
      setTitle('');
      setSubTitle('');
      setId(0);
    }
  }, [monstro]);

  return (
    <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>Criar Monstro</ThemedText>

        <TextInput
          style={styles.boxInput}
          placeholder='Monstro'
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
          <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(title, subTitle, id)}>
            <Text style={styles.buttonText}>
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
            <Text style={styles.buttonText}>
              Cancelar
            </Text>
          </TouchableOpacity>

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
    height: 60,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#DDD',
    margin: 5,
    paddingHorizontal: 10,
  },
});