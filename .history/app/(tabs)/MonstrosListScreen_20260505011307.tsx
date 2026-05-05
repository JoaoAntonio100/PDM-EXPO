import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import MonstrosModal from '@/components/modals/MonstrosModal';
import Monstros from '@/components/Monstros/monstros';
import MonstrosScrollView from '@/components/MonstrosScrollView';
import { ThemedView } from '@/components/themed-view';
import { IMonstros } from '@/interfaces/IMonstros';
import { useState } from 'react';

export default function MonstrosListScreen() {
  const [monstros, setMonstros] = useState<IMonstros[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMonstro, setSelectedMonstro] = useState<IMonstros>();

  const onAdd = (title: string, subTitle: string, id: number) => {

    if (id <= 0) {
      const newMonstro: IMonstros = {
        id: Math.random() * 1000,
        title: title,
        subTitle: subTitle
      };

      const monstrosPlus: IMonstros[] = [
        ...monstros,
        newMonstro
      ];

      setMonstros(monstrosPlus);
    } else {
      const updatedMonstros = monstros.map(monstro => {
        if (monstro.id === id) {
          return {
            ...monstro,
            title,
            subTitle,
          };
        }
        return monstro;
      });

      setMonstros(updatedMonstros);
    }

    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const newMonstros: Array<IMonstros> = [];

    for (let index = 0; index < monstros.length; index++) {
      const monstro = monstros[index];

      if (monstro.id != id) {
        newMonstros.push(monstro);
      }
    }

    setMonstros(newMonstros);
    setModalVisible(false);
  };

  const openModal = () => {
    setSelectedMonstro(undefined);
    setModalVisible(true);
  };

  const openEditModal = (selectedMonstro: IMonstros) => {
    setSelectedMonstro(selectedMonstro);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MonstrosScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => openModal()}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {monstros.map(monstro => (
          <TouchableOpacity onPress={() => openEditModal(monstro)} key={monstro.id}>
            <Monstros
              title={monstro.title}
              subTitle={monstro.subTitle}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <MonstrosModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        monstro={selectedMonstro}
      />
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
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
});