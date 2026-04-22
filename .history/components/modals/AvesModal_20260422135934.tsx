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