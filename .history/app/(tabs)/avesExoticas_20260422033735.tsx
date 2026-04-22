import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function novaAba() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/4_aguila_arpia_22141_3_600.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Aves Exóticas</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O que são aves?</ThemedText>
        <ThemedText>
          As aves são animais vertebrados com penas, bico e asas. A maioria delas poe ovos e tem
          corpo adaptado para voar, embora algumas espécies vivam mais no solo ou na água.
          Pássaros, corujas, araras e pinguins são exemplos de aves presentes em diferentes
          ambientes do planeta.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O que são aves exóticas?</ThemedText>
        <ThemedText>
          Aves exóticas são aves que não são nativas de uma determinada região. Em outras palavras,
          elas vieram de outro país ou bioma e foram introduzidas em um novo local. Alguns exemplos
          comuns são calopsitas, cacatuas e certas espécies de papagaios mantidas como animais de
          companhia.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cuidados e conservação</ThemedText>
        <ThemedText>
          O cuidado com aves exóticas exige responsabilidade, alimentação adequada e ambiente
          apropriado para o bem-estar do animal. Também é importante evitar o tráfico ilegal e
          apoiar a conservação das espécies, respeitando sempre as normas ambientais.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
    height: 200,
    width: 330,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
