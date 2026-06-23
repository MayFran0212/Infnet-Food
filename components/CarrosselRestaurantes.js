import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RESTAURANTES_CENTRO } from '../dados/dadosMock';
import { useTema } from '../context/ThemeContext';

export default function CarrosselRestaurantes({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { tema, isDarkMode } = useTema();

  const rolarParaEsquerda = () => {
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const rolarParaDireita = () => {
    if (currentIndex < RESTAURANTES_CENTRO.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const aoRolarLista = (event) => {
    const larguraCard = 170;
    const xPos = event.nativeEvent.contentOffset.x;
    const indexAtual = Math.round(xPos / larguraCard);
    setCurrentIndex(indexAtual);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carrosselContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[
              styles.setaBotao,
              styles.setaEsquerda,
              {
                backgroundColor: isDarkMode
                  ? '#1e1e1e'
                  : 'rgba(255, 255, 255, 0.95)',
              },
            ]}
            onPress={rolarParaEsquerda}>
            <Ionicons name="chevron-back" size={20} color={tema.primaria} />
          </TouchableOpacity>
        )}

        <FlatList
          ref={flatListRef}
          data={RESTAURANTES_CENTRO}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listRestaurantes}
          onScroll={aoRolarLista}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.cardMini,
                {
                  backgroundColor: tema.cardBg,
                  borderColor: isDarkMode ? tema.borda : '#eaeaea',
                },
              ]}
              onPress={() =>
                navigation.navigate('DetalhesRestaurante', {
                  restaurante: item,
                })
              }
              activeOpacity={0.7}>
              <View style={styles.rowTitle}>
                <Text
                  style={[
                    styles.nomeRestaurante,
                    { color: tema.textoPrincipal },
                  ]}
                  numberOfLines={1}>
                  {item.nome}
                </Text>
                <View
                  style={[
                    styles.tagNota,
                    { backgroundColor: isDarkMode ? '#2c2514' : '#fdf6e2' },
                  ]}>
                  <Ionicons name="star" size={10} color="#f39c12" />
                  <Text
                    style={[
                      styles.textoNota,
                      { color: isDarkMode ? '#f39c12' : '#333' },
                    ]}>
                    {item.nota}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.tipoRestaurante,
                  { color: tema.textoSecundario },
                ]}>
                {item.tipo}
              </Text>
            </TouchableOpacity>
          )}
        />

        {currentIndex < RESTAURANTES_CENTRO.length - 1 && (
          <TouchableOpacity
            style={[
              styles.setaBotao,
              styles.setaDireita,
              {
                backgroundColor: isDarkMode
                  ? '#1e1e1e'
                  : 'rgba(255, 255, 255, 0.95)',
              },
            ]}
            onPress={rolarParaDireita}>
            <Ionicons name="chevron-forward" size={20} color={tema.primaria} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 15, marginBottom: 10 },
  carrosselContainer: { position: 'relative', justifyContent: 'center' },
  listRestaurantes: { paddingVertical: 8, gap: 10 },
  cardMini: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    width: 160,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  nomeRestaurante: { fontSize: 13, fontWeight: 'bold', flex: 1 },
  tagNota: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  textoNota: { fontSize: 10, fontWeight: 'bold' },
  tipoRestaurante: { fontSize: 11, marginTop: 4 },
  setaBotao: {
    position: 'absolute',
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  setaEsquerda: { left: -5 },
  setaDireita: { right: -5 },
});
