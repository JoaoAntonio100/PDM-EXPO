import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import MonstrosModal from '@/components/modals/MonstrosModal';
import Monstros from '@/components/Monstros/monstros';
import MonstrosScrollView from '@/components/MonstrosScrollView';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';

interface IMonstros {
  id: number;
  title: string;
  subTitle: string;
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

export default function MonstrosListScreen() {
  const [monstros, setMonstros] = useState<IMonstros[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAddMonstro = (title: string, subTitle: string) => {
    const newMonstro: IMonstros = {
      id: Date.now(),
      title: title,
      subTitle: subTitle
    };

    const monstrosPlus: IMonstros[] = [
      ...monstros,
      newMonstro
    ];

    setMonstros(monstrosPlus);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MonstrosScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => openModal()}>
          <Text style={styles.headerButton}></Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {monstros.map(monstro => (
          <Monstros
            key={monstro.id}
            title={monstro.title}
            subTitle={monstro.subTitle}
          />
        ))}
      </ThemedView>

      <MonstrosModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAddMonstro}
      />
    </MonstrosScrollView>
  );
}
