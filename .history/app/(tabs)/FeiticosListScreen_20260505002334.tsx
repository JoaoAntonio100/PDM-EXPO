import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Feiticos from '@/components/Feitiços/feiticos';
import FeiticosModal from '@/components/modals/FeiticosModal';
import MonstrosScrollView from '@/components/MonstrosScrollView';
import { ThemedView } from '@/components/themed-view';
import { IFeiticos } from '@/interfaces/IFeiticos';
import { useState } from 'react';

export default function FeiticosListScreen() {
  const [feiticos, setFeiticos] = useState<IFeiticos[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedFeitico, setSelectedFeitico] = useState<IFeiticos>();

  const onAdd = (title: string, subTitle: string, id: number) => {

    if (id <= 0) {
      const newFeitico: IFeiticos = {
        id: Math.random() * 1000,
        title: title,
        subTitle: subTitle
      };

      const feiticosPlus: IFeiticos[] = [
        ...feiticos,
        newFeitico
      ];

      setFeiticos(feiticosPlus);
    } else {
      feiticos.forEach(feitico => {
        if (feitico.id == id) {
          feitico.title = title;
          feitico.subTitle = subTitle;
        }
      });
    }

    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const newFeiticos: Array<IFeiticos> = [];

    for (let index = 0; index < feiticos.length; index++) {
      const feitico = feiticos[index];

      if (feitico.id != id) {
        newFeiticos.push(feitico);
      }
    }

    setFeiticos(newFeiticos);
    setModalVisible(false);
  };

  const openModal = () => {
    setSelectedFeitico(undefined);
    setModalVisible(true);
  };

  const openEditModal = (selectedFeitico: IFeiticos) => {
    setSelectedFeitico(selectedFeitico);
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
        {feiticos.map(feitico => (
          <TouchableOpacity onPress={() => openEditModal(feitico)} key={feitico.id}>
            <Feiticos
              title={feitico.title}
              subTitle={feitico.subTitle}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <FeiticosModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        feitico={selectedFeitico}
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