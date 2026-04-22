import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';

export type AvesModalProps = {
  visible: boolean;
  onAdd: (title: string, subTitle: string) => void;
  onCancel: () => void;
};

export default function AvesModal ({ visible, onAdd, onCancel }: AvesModalProps) {

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
return (
    <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>

          <TextInput
            style={styles.boxInput}
            placeholder='Title'
            value={title}
            onChangeText={(text => setTitle(text))}
            autoFocus
          />

          <TextInput
            style={styles.boxInput}
            value={subTitle}
            onChangeText={(text => setSubTitle(text))}
            placeholder='SubTitle'
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(title, subTitle)}>
              <Text style={styles.buttonText}>
                Add
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
              <Text style={styles.buttonText}>
                Cancel
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  boxContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  boxInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonAdd: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});