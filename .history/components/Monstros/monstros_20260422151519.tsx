import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export type MonstrosProps = {
  title: string;
  subTitle: string;
  ataque?: number;
  defesa?: number;
  tipo?: string;
  nivel?: number;
  imagem?: any; // Para imagem local ou URI
};

export default function Monstros({ title, subTitle, ataque, defesa, tipo, nivel, imagem }: MonstrosProps) {
  return (
    <View style={styles.card}>
      {imagem && <Image source={imagem} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        {tipo && <Text style={styles.attribute}>Tipo: {tipo}</Text>}
        {nivel && <Text style={styles.attribute}>Nível: {nivel}</Text>}
        {ataque !== undefined && <Text style={styles.attribute}>Ataque: {ataque}</Text>}
        {defesa !== undefined && <Text style={styles.attribute}>Defesa: {defesa}</Text>}
      </View>
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