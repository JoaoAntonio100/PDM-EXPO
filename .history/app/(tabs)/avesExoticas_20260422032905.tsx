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
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Aves Exóticas</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O que são aves?</ThemedText>
        <ThemedText>
          As aves sao animais vertebrados com penas, bico e asas. A maioria delas poe ovos e tem
          corpo adaptado para voar, embora algumas especies vivam mais no solo ou na agua.
          Passaros, corujas, araras e pinguins sao exemplos de aves presentes em diferentes
          ambientes do planeta.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O que sao aves exoticas?</ThemedText>
        <ThemedText>
          Aves exoticas sao aves que nao sao nativas de uma determinada regiao. Em outras palavras,
          elas vieram de outro pais ou bioma e foram introduzidas em um novo local. Alguns exemplos
          comuns sao calopsitas, cacatuas e certas especies de papagaios mantidas como animais de
          companhia.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cuidados e conservacao</ThemedText>
        <ThemedText>
          O cuidado com aves exoticas exige responsabilidade, alimentacao adequada e ambiente
          apropriado para o bem-estar do animal. Tambem e importante evitar o trafico ilegal e
          apoiar a conservacao das especies, respeitando sempre as normas ambientais.
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
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
