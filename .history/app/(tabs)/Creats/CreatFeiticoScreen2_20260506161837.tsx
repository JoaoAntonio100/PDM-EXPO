import { IFeiticos } from '@/interfaces/IFeiticos';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import MonstrosScrollView from '@/components/MonstrosScrollView'; // Importando o ScrollView

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
    <MonstrosScrollView headerBackgroundColor={{ dark: '#1D3D47', light: '#A1CEDC' }}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
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
              <ThemedText style={styles.buttonText}>
                Salvar
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
              <ThemedText style={styles.buttonText}>
                Cancelar
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id <= 0}>
              <ThemedText style={styles.buttonText}>
                Deletar
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MonstrosScrollView>
  );
}
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

            <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id <= 0}>
              <Text style={styles.buttonText}>
                Deletar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
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
    borderRadius: 5,
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
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#DDD',
    margin: 5,
  },
});