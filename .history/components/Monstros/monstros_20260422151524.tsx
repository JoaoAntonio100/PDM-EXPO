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
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Para Android
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 5,
  },
  attribute: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});