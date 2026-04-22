import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Aves from '@/components/Aves/aves';
import AvesModal from '@/components/modals/AvesModal';
import MyScrollView from '@/components/MyScrollView';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

interface IAves {
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

export default function AvesListScreen() {
  const [aves, setAves] = useState<IAves[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (title: string, subTitle: string) => {
    const newAve: IAves = {
      id: Date.now(),
      title: title,
      subTitle: subTitle
    };

    const avesPlus: IAves[] = [
      ...aves,
      newAve
    ];

    setAves(avesPlus);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => openModal()}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {aves.map(ave => (
          <Aves
            key={ave.id}
            title={ave.title}
            subTitle={ave.subTitle}
          />
        ))}
      </ThemedView>

      <AvesModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
      />
    </MyScrollView>
  );
}