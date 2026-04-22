import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type FeiticosProps = {
  title: string;
  subTitle: string;
};

export default function Feiticos({ title, subTitle }: FeiticosProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
  },
});