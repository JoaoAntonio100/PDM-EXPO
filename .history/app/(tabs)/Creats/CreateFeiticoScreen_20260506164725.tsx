import { ThemedText } from '@/components/themed-text';
import { IFeiticos } from '@/interfaces/IFeiticos';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type CreateFeiticoScreenProps = {
  onAdd: (title: string, subTitle: string, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  feitico?: IFeiticos;
};

export default function CreateFeiticoScreen({ onAdd, onCancel, onDelete, feitico }: CreateFeiticoScreenProps) {
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (feitico) {
      setTitle(feitico.title);
      setSubTitle(feitico.subTitle);
      setId(feitico.id);
    } else {
      setTitle('');
      setSubTitle('');
      setId(0);
    }
  }, [feitico]);

  return (
    <View style={styles.container}>

        <ThemedText type="title" style={styles.title}>Criar Feitiço</ThemedText>

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
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: 'orange',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonDelete: {
    backgroundColor: 'red',
    borderRadius: 5,
    flex: 1,
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
    width: 1000,
    borderRadius: 10,
    backgroundColor: '#DDD',
    margin: 5,
    paddingHorizontal: 10,
  },
});