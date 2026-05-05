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

  const onAddFeitico = (title: string, subTitle: string) => {
    const newFeitico: IFeiticos = {
      id: Math.random() *1000,
      title: title,
      subTitle: subTitle
    };

    const feiticosPlus: IFeiticos[] = [
      ...feiticos,
      newFeitico
    ];

    setFeiticos(feiticosPlus);
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
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {feiticos.map(feitico => (
          <Feiticos
            key={feitico.id}
            title={feitico.title}
            subTitle={feitico.subTitle}
          />
        ))}
      </ThemedView>

      <FeiticosModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAddFeitico}
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