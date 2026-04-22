import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MonstrosYugioh() {
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
        <ThemedText type="title">Monstros Yu-Gi-Oh</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O que são monstros Yu-Gi-Oh?</ThemedText>
        <ThemedText>
          Os monstros Yu-Gi-Oh são criaturas fictícias representadas em cartas de jogo. Cada monstro
          possui atributos como ataque, defesa, nível e tipo, que determinam seu papel no duelo.
          Exemplos incluem o Dragão Branco de Olhos Azuis, o Mago Negro e o Dragão Negro de Olhos Vermelhos.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tipos de monstros</ThemedText>
        <ThemedText>
          Os monstros são classificados em tipos como Dragão, Mago, Guerreiro, Demônio, entre outros.
          Cada tipo tem características únicas e estratégias específicas no jogo. Monstros de efeito,
          normais e de ritual oferecem diferentes mecânicas para os duelistas.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Estratégias e decks</ThemedText>
        <ThemedText>
          Construir um deck com monstros equilibrados é essencial para vencer duelos. É importante
          considerar sinergias entre cartas, combos poderosos e contra-estratégias contra oponentes.
          Sempre respeite as regras do jogo e divirta-se duelando!
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
    height: 270,
    width: 550,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
